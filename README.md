# UI Component Library
A React UI component library

# Purpose
Several reasons induced the creation of this project:
1) To create a reusable, cross-project UI component library.
    - Reduce code duplication
2) Easier maintenance & upgrades to be performed on the components.
    - Avoid third party dependency lock-in. (such as relying external UI library like MUI, Chakra, etc)
3) Consistency across application
    - Uniform design across different part of the application.
4) Customization
    - Able to include accessibility for components.
    - Custom theming, provide flexibility.

# Technology and why it is used
1) React
    - Large Ecosystem.
2) StyledComponent
    - Styling/CSS for components.
2) Storybook
    - Interactive UI documentation.
3) Typescript
    - Mainly for type safety & code reliability.
4) Jest
    - Tests to ensure the components are working as expected.
5) Rollup
    - Tree shaking ability which makes it better at bundling UI library.