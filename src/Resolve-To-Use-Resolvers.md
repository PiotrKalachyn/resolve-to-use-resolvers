# Resolve To Use Resolvers

by Piotr Kalachyn

[#Angular](https://angular.io/)

## Introduction

> The article touches on the power of [*resolvers*](https://angular.io/api/router/Resolve) in Angular routing and why we should all use and enjoy them.
Please refer to the [demo application](https://stackblitz.com/edit/ng-timely-data-pk-indexed-db).


Generally, resolvers are for preparing data in the Router (namely, in the data object of a route), synchronously or	asynchronously, before navigation to a given route can take place. Moreover, if any of the resolvers of a route does not resolve its data, navigation is aborted.

```
{
   path: "edit/:userId",
   component: UserEditComponent,
   resolve: { user: UserResolver }
}
```

In the example above `UserEditComponent` will be given the object `user` as `activatedRoute.snapshot.data.user`.

## What is hot and cool about it?

Firstly, it allows us to build components that have no blooming idea where their data come from. We like our components dumber, don’t we? Just like we outsource data retrieval and persistence operations to a service agnostic of ways information is presented to or entered by the user, we can now take one step further and move the flow of consuming such services into a separate unit – a resolver. As a result, our data-origin-agnostic component can rest assured that by the time it is initialized all the relevant data has been made available to it.

Secondly, resolvers are reusable. Once you have one, you can graft it onto another branch of a routing tree:

```
{
   path: "edit/:userId",
   component: UserEditComponent,
   resolve: { user: UserResolver }
},
{
   path: "user-messages/:userId",
   component: UserMessagesComponent,
   resolve: {
     messages: UserMessagesResolver,
     user: UserResolver
   }
}
```

Thirdly, resolved data is inherited by child routes (provided you use `paramsInheritanceStrategy: 'always'`). Consider the following setup (as in `src/app/users/users-routing.module.ts`):

```
{
    path: "resolve-edit/:userId",
    resolve: { user: UserResolver },
    children: [
        {
          path: "",
          pathMatch: "full",
          component: UserResolveEditComponent
        },
        {
          path: "messages",
          component: UserMessagesComponent
        }
    ]
}
```

Here, both `UserResolveEditComponent` and `UserMessagesComponent` will have user in their route data, because it has been resolved in the parent route (the components themselves do not need to be nested). Thus, we have another (and lean) way to share data between several components, without a service: the data will be resolved during navigation and destroyed when the application leaves the route.

Fourthly, the user experience can be made much smoother. The flow of data acquisition that we outsource to resolvers can and should be decorated with all the necessary UI elements like spinning wait indicators and eventual modal error alerts. Yet while we provide that clear visual feedback to the end user, the main picture does not flicker: the application will actually start navigation once (and only when) all the required data has been resolved.

To demonstrate the above I have created this [mocked-up application](https://stackblitz.com/edit/ng-timely-data-pk-indexed-db) that creates data entries (users) and allows for editing them in two ways:

One way (let’s call it view-first) is what we have seen perhaps too often, taken right from the [schoolbook](
https://angular.io/tutorial/toh-pt6):

```
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(private heroService: HeroService) {}

    ngOnInit() {
      this.getHero();
    }
```

Looks familiar, right? It rings Big Ben even in 2020.

The pattern is like this: a component is instantiated, initialized, and begins to gets its data from a service. This is how `UserGetEditComponent` is organized. It creates a form and populates it with the data received. We’ve crafted and sold a lot of software like that. It works fine... until it doesn’t. I’ll get back to it in a short while.

The other way (to contrast, I’ll call it data-first) inverts the timing: get data first, and if/when you have them, display the editing component.

In `user.resolver.ts`

```
return this.usersService.getUser(userId).pipe(
  finalize(() => this.spinner.remove(spinnerSubscription)),
  catchError(error => {
    this.modalDialog.showError(error);
    return throwError(error);
  })
  );
```
In `user-resolve-edit.component.ts`

```
export class UserResolveEditComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.user = this.route.snapshot?.data?.user;
      this.populateForm();
  }
```

Indeed, why rush to navigate (shifting the user’s over-exploited attention) from a list of entries to an entry detail form if you haven’t fetched the entry yet? Once you’ve got it, you will show a form the user can work on right away. And what if you don’t get any data? Maybe the entry no longer exists, or has become classified, or the user’s train is passing through a tunnel, or there’s a huge transaction in progress on the backend server? All you care is to pop-up a neat, informative error alert from the resolver and just cancel navigation – flicker-free. Your component will not be inserted into the DOM before it has something to work on. And because navigation didn’t take place, your original view was not destroyed and doesn’t have to be re-instantiated. In our example, if you click any of the “Try to resolve” buttons, you will see an error message right above the unshakable list of entries which will not be re-fetched from the data source. However, click any of the “Try to get” buttons, and you will see the browser changing location to a user-editing component and back, just to display an error… and fetch the same list of users again. Makes no sense to me, and certainly not to a busy user.

A side benefit of the data-first attitude is that you minimize situations when you really need to veil the whole screen with a modal tinted layer and a spinner to prevent the user from clicking controls that are still waiting for data. In the sample application here I only use non-modal spinners that hover in a corner of the screen, leaving the user full freedom to click around.

## When do we not want to use resolvers?

Now that we have already bought into the idea, let's sober up a little and consider potential drawbacks. 

One limitation of resolvers is that they are assigned to nodes of the routing tree, while some components may not be “routed” but instead included via a parent components template. So resolvers simply cannot be used everywhere in a natural way.

Another shortcoming has to do with timing in a situation when a component or its nested ones perform some async tasks that cannot be delegated to resolvers:

Imagine one of those subcomponents requests something asynchronously before it can be displayed and used. For instance, a user detail form can include an interactive map for assigning a preferred point of service to a user. In this case fetching one data item (the user detail) in a resolver, and another in a components method gives us no benefit but a delay: the framework will have to wait for user data to resolve before it shows the UserComponent, and only then fire a request of the map.

If instead we fire both requests in a component’s lifecycle hook method (e.g. ngOnInit), they start at the same time and get handled whenever each of them is ready, in unpredictable natural order, resulting in quicker processing and smoother UX.

## Matter or choice

Some argue that what I call view-first here is merely user-first: some activity happening immediately is experienced by the user as a smoother process compared to just spinning waiting elements. That would be true in a restaurant situation: while you are anticipating your dinner, the waiter has already put cutlery on the table. You both know it’s coming. However, in a post office it would feel differently: imagine you drop by to check if there is any mail for you, you are given a book to sign the receipt, and then the clerk goes to look for your letters and comes back only to tell you there is none today and nothing to sign.

So, for the sake of the user, whether we go view-first or data-first depends on the average waiting time and probability of default.

May it be useful and fun.

Please, share your feedback via [piotr.kalachyn@gmail.com](piotr.kalachyn@gmail.com)
