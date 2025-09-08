# Data Query Tool (Angular Backend)

# Initial Setup

* Install nodejs from https://nodejs.org/en/download/
* Run `npm install npm@latest -g`
* Run `npm install -g @angular/cli@latest`
* `ng serve`: development server
* `ng build --configuration production --aot`: build dist directory for deployment

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

# Upgrades

## Upgrade Angular to Latest Version

Angular versions seem to last about 18 months (6 months as primary version, then 1y of support).

To update version:
* Check `package.json` for the version of Angular (this is the first number in `dependencies` > `@angular/SOMETHING`).
* Navigate to the [Angular Update Guide](https://update.angular.io/)
* Change the 'From' version to this repo's current version.
* The 'To:' version should be set to the current stable release.
  * https://angular.io/guide/releases#release-schedule
* Run the steps in the order provided on the 'Angular Update Page'

## Larger Upgrades

In theory, upgrades should be done steadily...but, practically, updates can end up jumping across multiple major version. E.g., I'm currently going from Angular 14 to Angular 20. Ideally, follow the gradual update scheme provided at angular.dev/update-guide, but across sucha gulf, it's more convenient to jump ahead and fix anything that broke. Here are my steps:

* Install most recent version of nodejs
* Confirm install:
  * `node -v`
  * `npm -v`
* Update Angular CLI
  * Global
    * `npm uninstall -g @angular/cli`
    * `npm install -g @angular/cli@latest`
  * Local
    * `ng update @angular/cli`
* Update Angular Core and Other Dependenciess
  * For each minor version, run the following:
    * `ng update @angular/cli@VERSION @angular/core@VERSION` 

### Troubleshooting

* `Repository is not clean. Please commit or stash any changes before updating.`
  * Ensure that all changes have been committed
  * Delete `package-lock.json` file (or cut to location outside repo)
* Package "x" has an incompatible peer dependency to "y"...
  * Run `ng update x`
  * (or) add the `--force` option

## Other

* npm i -g npm-check-updates
* ncu -u
* npm install
