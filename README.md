feature for searching and viewing employee information.

## Features

- project has been rewritten in react + typescript
- project uses REACT ROUTER instead of handwritten router
- switched to userContext instead of relying on an util for information
- split pages into reuseable components
- used protectedRoutes component that React router allows instead of handwritten one
- updated existing util functions to work on react better
- babel config and webpack config written so it works seamlessly on react + ts
- debug code and input validation implemented as asked in MR comments
- index page is fully responsive as it should have been (homework 1)
- Hamburgermenu is now built in every page except auth pages on low resolutions
- Project was at the start bundled with vite, now uses webpack
- installed webpack's plugins for dev server, preview server and loaders for ts/scss
- configured webpack config by hand (Please no more took ages)
- project is fully in scss instead of vanila css
- Added a new page called userroles, admins can change roles of any existing user
- userroles has working searchh, logged in user can't change their own roles
- userdetails page shows edit button if logged in user is that employee's manager
- on userdetails page every info field is by default an read only input
- admins can also see edit button, header includes additional tabs for admins
- Backend has been turned into typescript, used built in types for express
- Project is fully typescript
- Sign Up / Sign In implemented both in frontend and backend
- Used Express.js, for simple serverside set up
- Bcrypt for hashing when signing up, bcrypt compare for password checking
- Uses LowDB for npm backend that can write and read to data.json
- Save to session storage if user doesnt want to stay logged in for long, otherwise to local storage
- Basic search (id, fullname , firstname, lastname)
- Advanced search (name, email, phone, skype, building, room, department)
- Dynamic Grid / Row employee lists
- Detailed information page for selected employees
- Saved URL for search (basic search only)
- Parse functions for data (normalizeVisaData.js, formatDate.js)
- dynamically render pages from js
- Remote icon if employee is remote on detailed page
- Fetch polyfill fully supports post and get methods
- Modularized many functions to make them useable

## How to run

## BACKEND SERVER START GUIDE

1. cd anri-ugrexelidze/backend/, Make sure you are in the correct folder
2. npm install in terminal, confirm every dependency got installed
3. npm run build, Confirm dist/ file appeared ( or alternatively npm run dev to instantly start)
4. npm start after confirming you're in backend folder and dist exists, output should be server is listening

## FRONTEND WEBPACK SERVER START GUIDE

1. cd anri-ugrexelidze, make sure you're in correct folder
2. npm install, confirm every dependency got installed
3. npm run build, confirm webpack bundled the entire project
4. finally execute npm run dev for dev site, npm run preview for preview project

## Default Admin User

1. Email: admin@gmail.com
2. Password: adminadmin
3. Same password for every user, newly created ones can be anything

## Default HR User

1. Email: johnsnow@gmail.com
2. Password: adminadmin
3. This is the only default HR, assign HR role to anyone you wish from userroles page

## Author

Anri Ugrekhelidze

## project structure

```text
anri-ugrexelidze/
  index.html                 # Entry HTML file
  package.json
  package-lock.json
  tsconfig.json              # TypeScript configuration
  webpack.config.js          # Webpack bundler configuration
  babel.config.js            # Babel transpiler configuration

  public/                    # Static assets
    assets/                  # Images and icons

  src/                       # React/TypeScript source (compiled to dist/)
    App.tsx                  # Main React application component
    main.tsx                 # React entry point
    main.scss                # Global styles
    colors.scss              # Color variables

    components/              # Reusable React components
      DirectoryGrid/
        DirectoryGrid.tsx
        DirectoryGrid.scss
      DirectoryList/
        DirectoryList.tsx
        DirectoryList.scss
      Header/
        Header.tsx
        Header.scss
      InfoItem/
        InfoItem.tsx
      LoginBox/
        LoginBox.tsx
      MobileMenu/
        MobileMenu.tsx
        MobileMenu.scss
      NotFound/
        NotFound.tsx
        NotFound.scss
      ProtectedRoute/
        ProtectedRoute.tsx
      RegisterBox/
        RegisterBox.tsx
      SearchTabs/
        SearchTabs.tsx
        SearchTabs.scss
      UserRoleRow/
        UserRoleRow.tsx
        UserRoleRow.scss
        RolesEmptyRow.tsx
        RolesLoadingRow.tsx
      UserSection/
        UserSection.tsx
      ViewToggle/
        ViewToggle.tsx
        ViewToggle.scss

    pages/                   # Page components
      AuthPage/
        AuthPage.tsx
        AuthPage.scss
      IndexPage/
        IndexPage.tsx
        IndexPage.scss
      UserDetailsPage/
        UserDetails.tsx
        UserDetails.scss
      UserRolesPage/
        UserRolesPage.tsx
        UserRolesPage.scss

    context/                 # React Context providers
      UserContext.tsx

    hooks/

    types/                   # TypeScript type definitions
      assets.d.ts
      Auth.ts
      FetchTypes.ts
      Search.ts
      User.ts

    utils/                   # Reusable utility functions
      canUserEdit.ts
      copyLink.ts
      editUserFields.ts
      fetchPolyfill.ts
      fetchUsers.ts
      fetchWithId.ts
      fields.ts
      formatDate.ts
      getActiveTab.ts
      getCurrentUser.ts
      handleRoleUpdate.ts
      isUserRemote.ts
      loginUser.ts
      normalizeVisaData.ts
      runAdvancedSearch.ts
      runSearch.ts
      searchByName.ts
      signOut.ts
      signUpUser.ts
      toggleMobileMenu.ts
      updateRole.ts

  dist/                      # Webpack bundle output folder
    assets/
    index.html
    main.js

  backend/                   # Local API server (Express + TypeScript + LowDB + Bcrypt)
    app.ts                   # Express application entry point
    package.json
    package-lock.json
    tsconfig.json            # TypeScript configuration for backend

    controllers/             # Request handlers
      authController.ts
      employeeController.ts

    routes/                  # API route definitions
      authRoutes.ts
      employeeRoutes.ts

    db/
      db.ts                  # LowDB configuration
      data.json              # JSON storage for employees
      defaultEmployee.ts     # Template for new employees

    types/                   # Backend TypeScript types
      index.ts

    dist/                    # Compiled backend JavaScript
      app.js
      controllers/
      routes/
      db/
      types/
```
