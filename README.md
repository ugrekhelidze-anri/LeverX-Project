feature for searching and viewing employee information.

## Features / Stack

-- Frontend: Next.js, HTML , SCSS
-- State Management: Redux TK, RTK Query
-- Backend: Node.js, Express
-- DB: LowDB for local database

## How to run

## BACKEND SERVER START GUIDE

1. cd backend/, Make sure you are in the correct folder
2. npm install in terminal, confirm every dependency got installed
3. npm run build, Confirm dist/ file appeared ( or alternatively npm run dev to instantly start)
4. npm start after confirming you're in backend folder and dist exists, output should be server is listening

## FRONTEND WEBPACK SERVER START GUIDE

1. cd nextapp, make sure you're in correct folder
2. npm install, confirm every dependency got installed
3. npm run build, confirm turbopack bundled the entire project
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
LeverXEducationalProject/

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

  nextapp/                   # Frontend Next.js application
    package.json
    next.config.ts
    tsconfig.json

    public/                  # Static assets
      assets/                # Images and icons

    src/
      app/                   # Next.js app router pages/layouts
        layout.tsx
        providers.tsx
        (public)/
          auth/
            layout.tsx
            page.tsx
            page.module.scss
        (protected)/
          layout.tsx
          page.tsx
          page.module.scss
          permissions/
            page.tsx
            page.module.scss
          users/
            [id]/
              page.tsx
              page.module.scss

      components/            # Reusable UI components
        DirectoryGrid/
          DirectoryGrid.tsx
          DirectoryGrid.module.scss
        DirectoryList/
          DirectoryList.tsx
          DirectoryList.module.scss
        Header/
          Header.tsx
          Header.module.scss
        InfoItem/
          InfoItem.tsx
        LoginBox/
          LoginBox.tsx
        MobileMenu/
          MobileMenu.tsx
          MobileMenu.module.scss
        NotFound/
          NotFound.tsx
          NotFound.module.scss
        RegisterBox/
          RegisterBox.tsx
        SearchTabs/
          SearchTabs.tsx
          SearchTabs.module.scss
        UserRoleRow/
          UserRoleRow.tsx
          UserRoleRow.module.scss
          RolesEmptyRow.tsx
          RolesLoadingRow.tsx
        UserSection/
          UserSection.tsx
        ViewToggle/
          ViewToggle.tsx
          ViewToggle.module.scss

      features/
        user/
          usersApiSlice.ts
          userSlice.ts

      hooks/
        useHeaderPaths.ts
        useUserContext.ts

      store/
        store.ts

      styles/
        globals.scss
        fadeIn.scss
        colors.scss

      types/                 # TypeScript type definitions
        assets.d.ts
        Auth.ts
        FetchTypes.ts
        Query.ts
        Search.ts
        User.ts

      utils/                 # Reusable utility functions
        canUserEdit.ts
        copyLink.ts
        editUserFields.ts
        fields.ts
        formatDate.ts
        formatDateForInput.ts
        getActiveTab.ts
        getCurrentUser.ts
        handleFieldChange.ts
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
```
