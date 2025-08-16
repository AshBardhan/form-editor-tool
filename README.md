# Form Kit - A Visual DnD Form Editor
View Demo: [https://my-formkit-ui.netlify.app/builder](https://my-formkit-ui.netlify.app/builder)

## Overview
The application is crafted using _Next.js_ and _React_ to build scalable and reusable components
* Components are categorised for reusability and scalability
    *   **Builder**: Page-specific components for the _/builder_ page consisting of
        *   Form Component Sidebar
        *   Form Field Canvas
        *   Form/Field Configuration Sidebar
        *   Form Builder Header
    *   **Form Field**: Components specific for Form Field Canvas
    *   **Field Prop**: Components specific for Field Configuration Sidebar
    *   **UI**: Basic components being used by Form Field and Field Prop components
    *   **Layout**: Wrapper Components used by Builder components
*   **TailwindCSS** has been used maintaining styling of multiple components
    *   A set of commonly used colors
    *   Dark and Light themed classes
*   Optimised performance to minimise redundant re-renders and computations, by managing
    *   _useMemo_ and _useCallback_ hooks.
    *   selector-based _zustland_ stores (states and actions)
*   **Semantic HTML** to promote SEO and accessibility
*   Multiple animated components using _Framer motion_
    

## Features Implemented
As per given requirements
*   **Form Component Sidebar**
    *   A list of components are grouped under categories
    *   Every category can be collapsed/expanded by a caret icon next to category heading
    *   Search bar input at the top to get filtered results by component or category name
    *   Any component can be dragged and dropped to the Form Field Canvas (with keyboard a11y)
*   **Form Field Canvas**
    *   A list of dropped components, which are Form Field items
    *   Each Form Field item has the following capabilities
        *   **Select** to edit the required properties (as shown in Field Configuration Sidebar)
        *   **Rearrange** their position within the list (with keyboard a11y)
        *   **Copy** to save some form building time (unavailable on error state)
        *   **Delete** the existing item
    *   A Device Selector toolbar can be used to toggle to check the canvas responsiveness 
*   **Form/Field Configuration Sidebar**
    *   Form Configuration is shown by default, to update
        *   **Form Title** (changes are reflected on the Form Builder Header)
        *   **Theme** (changes reflected on the Form Field Canvas)
    *   Field Configuration is shown, once a field has been selected from Form Field Canvas
        *   A list of editable properties are shown of the selected field
        *   Every property has some validation check (implemented with _zod_) which will reflect error message below and error block on the selected field of canvas
*   **Form Builder Header**
    *   Toggle buttons to expand and collapse both sidebars
    *   Form title at the middle configured for Form/Field Configuration Sidebar
    *   Publish and Preview buttons (just for presentation purposes)
    