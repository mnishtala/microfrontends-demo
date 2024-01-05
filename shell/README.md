# Steps to create the MFE App
 1. Create a Project folder to keep all the MFE applications
 2. Create a skeleton application with the name shell by running the following command `ng new shell --create-application="false"`
 3. Change your directory to shell and run the following command to create the host application in the shell app `ng g application host`
 4. Update the App Routing Module to load AppComponent at the root
    `{ path: '',component : AppComponent}`
 5. Change your directory back to your Project folder and create 2 new applications (products, gallery) with these commands
    `ng new gallery`
    `ng new products`
 6.  Update App routing Modules in both the applications `{path: '',component : AppComponent}` to load the AppComponent at the root
 7.  Now add the module federation package to all the 3 applications 
    * `ng add @angular-architects/module-federation --project host --port 4200`
    * `ng add @angular-architects/module-federation --project gallery --port 5001`
    * `ng add @angular-architects/module-federation --project products --port 5002`
 8. Now expose the modules from the Remote Applications (i.e, products and gallery) here is the sample snippet
        `name: "products", filename: "remoteEntry.js", exposes: {'./appModule': './/src/app/app.module.ts',}`
 9. Catch the Exposed modules in the host application's webpack.config.js similar to this snippet
        `remotes: { "gallery": "http://localhost:5001/remoteEntry.js", "products": "http://localhost:5002/remoteEntry.js"}`

# Communication between two microfrontends

1. Load the two MFEs at once <br>
We will use a feature known as "Named Router Outlets." This allows us to have multiple <router-outlet> tags in the application, each named differently, to load different MFEs in different parts of the application at the same time.
    - Define named outlets 
    ```html
    <div style="display:flex">
    <router-outlet name="gallery-outlet"></router-outlet>
    <router-outlet name="product-outlet"></router-outlet>
    </div>
    ```
    - Configure Routes
    ```typescript
     {
      path: 'gallery',
      loadChildren: () =>
      import('gallery/homeModule').then((module) => module.HomeModule),
      outlet: 'gallery-outlet'
    },
    {
      path: 'products',
      loadChildren: () =>
        import('products/homeModule').then((module) => module.HomeModule),
        outlet: 'product-outlet'
    }
    ```
    - Navigate to the Routes
    ``` html
    <a [routerLink]="[{ outlets: { 'gallery-outlet': ['gallery'], 'product-outlet': ['products'] } }]"(click)="loaded = true"
    *ngIf="!loaded"
    >Load MFEs</a>
    ```

2. Use custom event in one MFE to dynamically emit event on change, for example
  ```typescript
      const customEvent = new CustomEvent('eventFromMfe', {detail: {name: 'test'}})

  ```
3. Use fromEvent of rxjs to dynamically listen to events from MFE into the MFE which should be notified on change
  ``` typescript
   fromEvent(window, 'eventFromMfe').subscribe((event)=>{
     // consume event and do needful
    })
  ```

