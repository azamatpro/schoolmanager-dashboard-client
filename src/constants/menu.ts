export type MenuItemTypes = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
};

const MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard-outline',
        badge: { variant: 'success', text: '9+' },
        url: '/dashboard',
    },
    {
        key: 'schools-list',
        label: 'Schools',
        isTitle: false,
        icon: 'fe-map',
        url: '/apps/schools',
    },
    {
        key: 'adminstrators-list',
        label: 'Adminstrators',
        isTitle: false,
        icon: 'fe-user-plus',
        url: '/apps/adminstrators',
    },
    {
        key: 'teachers-list',
        label: 'Teachers',
        isTitle: false,
        icon: 'fe-user-check',
        url: '/apps/teachers',
    },
    {
        key: 'students-list',
        label: 'Students',
        isTitle: false,
        icon: 'fe-users',
        url: '/apps/students',
    },
    {
        key: 'courses-list',
        label: 'Courses',
        isTitle: false,
        icon: 'mdi mdi-book-open-page-variant-outline',
        url: '/apps/courses',
    },
    {
        key: 'rooms-list',
        label: 'Rooms',
        isTitle: false,
        icon: 'fe-home',
        url: '/apps/rooms',
    },
    {
        key: 'scheduals',
        label: 'Scheduals',
        isTitle: false,
        icon: 'fe-menu',
        url: '/apps/scheduals',
    },
    {
        key: 'fees-list',
        label: 'Fees and Expenses',
        isTitle: false,
        icon: 'fe-database',
        url: '/apps/fees',
    },
    {
        key: 'feedbacks-list',
        label: 'Feedbacks',
        isTitle: false,
        icon: 'fe-edit',
        url: '/apps/feedbacks',
    },
    {
        key: 'apps-email',
        label: 'Email',
        isTitle: false,
        icon: 'mdi mdi-email-outline',
        children: [
            {
                key: 'email-inbox',
                label: 'Inbox',
                url: '/apps/email/inbox',
                parentKey: 'apps-email',
            },
        ],
    },
    { key: 'others', label: 'Others', isTitle: true },
    {
        key: 'logout',
        label: 'Logout',
        icon: 'fe-log-out',
        isTitle: false,
        url: '/auth/logout',
    },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'mdi mdi-view-dashboard',
        url: '/dashboard',
    },
    {
        key: 'base-ui',
        icon: 'mdi mdi-invert-colors',
        label: 'UI Elements',
        isTitle: true,
        children: [
            {
                key: 'base-ui-buttons',
                label: 'Buttons',
                url: '/base-ui/buttons',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-cards',
                label: 'Cards',
                url: '/base-ui/cards',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-avatars',
                label: 'Avatars',
                url: '/base-ui/avatars',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-tabs-accordions',
                label: 'Tabs & Accordions',
                url: '/base-ui/tabs-accordions',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-modals',
                label: 'Modals',
                url: '/base-ui/modals',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-progress',
                label: 'Progress',
                url: '/base-ui/progress',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-notifications',
                label: 'Notifications',
                url: '/base-ui/notifications',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-offcanvas',
                label: 'Offcanvas',
                url: '/base-ui/offcanvas',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-placeholders',
                label: 'Placeholders',
                url: '/base-ui/placeholders',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-spinners',
                label: 'Spinners',
                url: '/base-ui/spinners',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-images',
                label: 'Images',
                url: '/base-ui/images',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-carousel',
                label: 'Carousel',
                url: '/base-ui/carousel',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-embedvideo',
                label: 'Embed Video',
                url: '/base-ui/embedvideo',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-dropdown',
                label: 'Dropdowns',
                url: '/base-ui/dropdowns',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-popovers-tooltips',
                label: 'Tooltips & Popovers',
                url: '/base-ui/popovers-tooltips',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-general',
                label: 'General UI',
                url: '/base-ui/general',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-typography',
                label: 'Typography',
                url: '/base-ui/typography',
                parentKey: 'base-ui',
            },
            {
                key: 'base-ui-grid',
                label: 'Grid',
                url: '/base-ui/grid',
                parentKey: 'base-ui',
            },
        ],
    },
    {
        key: 'apps',
        icon: 'fe-grid',
        label: 'Apps',
        isTitle: true,
        children: [
            {
                key: 'apps-calendar',
                label: 'Calendar',
                isTitle: false,
                url: '/apps/calendar',
                parentKey: 'apps',
            },
            {
                key: 'apps-chat',
                label: 'Chat',
                isTitle: false,
                url: '/apps/chat',
                parentKey: 'apps',
            },
            {
                key: 'apps-email',
                label: 'Email',
                isTitle: false,
                parentKey: 'apps',
                children: [
                    {
                        key: 'email-inbox',
                        label: 'Inbox',
                        url: '/apps/email/inbox',
                        parentKey: 'apps-email',
                    },
                ],
            },
            {
                key: 'apps-tasks',
                label: 'Tasks',
                isTitle: false,
                parentKey: 'apps',
                children: [
                    {
                        key: 'task-kanban',
                        label: 'Kanban Board',
                        url: '/apps/tasks/kanban',
                        parentKey: 'apps-tasks',
                    },
                    {
                        key: 'task-details',
                        label: 'Details',
                        url: '/apps/tasks/details',
                        parentKey: 'apps-tasks',
                    },
                ],
            },
            {
                key: 'apps-projects',
                label: 'Projects',
                isTitle: false,
                url: '/apps/projects',
                parentKey: 'apps',
            },
            {
                key: 'apps-contacts',
                label: 'Contacts',
                isTitle: false,
                parentKey: 'apps',
                children: [
                    {
                        key: 'contacts-list',
                        label: 'Members List',
                        url: '/apps/contacts/list',
                        parentKey: 'apps-contacts',
                    },
                    {
                        key: 'contacts-profile',
                        label: 'Profile',
                        url: '/apps/contacts/profile',
                        parentKey: 'apps-contacts',
                    },
                ],
            },
        ],
    },
    {
        key: 'components',
        icon: 'mdi mdi-lifebuoy',
        label: 'Components',
        isTitle: true,
        children: [
            {
                key: 'widgets',
                label: 'Widgets',
                isTitle: false,
                url: '/widgets',
                parentKey: 'components',
            },
            {
                key: 'extended-ui',
                label: 'Extended UI',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'extended-ui-nestable',
                        label: 'Nestable List',
                        url: '/extended-ui/nestable',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-rangesliders',
                        label: 'Range Sliders',
                        url: '/extended-ui/rangesliders',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-sweet-alert',
                        label: 'Sweet Alert',
                        url: '/extended-ui/sweet-alert',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-tour',
                        label: 'Tour Page',
                        url: '/extended-ui/tour',
                        parentKey: 'extended-ui',
                    },
                    {
                        key: 'extended-ui-treeview',
                        label: 'Tree View',
                        url: '/extended-ui/treeview',
                        parentKey: 'extended-ui',
                    },
                ],
            },
            {
                key: 'forms',
                label: 'Forms',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'form-basic',
                        label: 'General Elements',
                        url: '/forms/basic',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-advanced',
                        label: 'Form Advanced',
                        url: '/forms/advanced',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-validation',
                        label: 'Validation',
                        url: '/forms/validation',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-wizard',
                        label: 'Wizard',
                        url: '/forms/wizard',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-upload',
                        label: 'File Uploads',
                        url: '/forms/upload',
                        parentKey: 'forms',
                    },
                    {
                        key: 'form-editors',
                        label: 'Editors',
                        url: '/forms/editors',
                        parentKey: 'forms',
                    },
                ],
            },
            {
                key: 'charts',
                label: 'Charts',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'chart-apex',
                        label: 'Apex Charts',
                        url: '/charts/apex',
                        parentKey: 'charts',
                    },
                    {
                        key: 'chart-chartjs',
                        label: 'Chartjs',
                        url: '/charts/chartjs',
                        parentKey: 'charts',
                    },
                ],
            },
            {
                key: 'tables',
                label: 'Tables',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'table-basic',
                        label: 'Basic Tables',
                        url: '/tables/basic',
                        parentKey: 'tables',
                    },
                    {
                        key: 'table-advanced',
                        label: 'Advanced Tables',
                        url: '/tables/advanced',
                        parentKey: 'tables',
                    },
                ],
            },
            {
                key: 'icons',
                label: 'Icons',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'icon-feather',
                        label: 'Feather Icons',
                        url: '/icons/feather',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-mdiicons',
                        label: 'Material Design Icons',
                        url: '/icons/mdi',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-dripicons',
                        label: 'Dripicons',
                        url: '/icons/dripicons',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-font-awesome',
                        label: 'Font Awesome 5',
                        url: '/icons/font-awesome',
                        parentKey: 'icons',
                    },
                    {
                        key: 'icon-themify',
                        label: 'Themify',
                        url: '/icons/themify',
                        parentKey: 'icons',
                    },
                ],
            },
            {
                key: 'maps',
                label: 'Maps',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'maps-googlemaps',
                        label: 'Google Maps',
                        url: '/maps/google',
                        parentKey: 'maps',
                    },
                    {
                        key: 'maps-vectormaps',
                        label: 'Vector Maps',
                        url: '/maps/vector',
                        parentKey: 'maps',
                    },
                ],
            },
            {
                key: 'menu-levels',
                label: 'Menu Levels',
                isTitle: false,
                parentKey: 'components',
                children: [
                    {
                        key: 'menu-levels-1-1',
                        label: 'Level 1.1',
                        url: '/',
                        parentKey: 'menu-levels',
                        children: [
                            {
                                key: 'menu-levels-2-1',
                                label: 'Level 2.1',
                                url: '/',
                                parentKey: 'menu-levels-1-1',
                                children: [
                                    {
                                        key: 'menu-levels-3-1',
                                        label: 'Level 3.1',
                                        url: '/',
                                        parentKey: 'menu-levels-2-1',
                                    },
                                    {
                                        key: 'menu-levels-3-2',
                                        label: 'Level 3.2',
                                        url: '/',
                                        parentKey: 'menu-levels-2-1',
                                    },
                                ],
                            },
                            {
                                key: 'menu-levels-2-2',
                                label: 'Level 2.2',
                                url: '/',
                                parentKey: 'menu-levels-1-1',
                            },
                        ],
                    },
                    {
                        key: 'menu-levels-1-2',
                        label: 'Level 1.2',
                        url: '/',
                        parentKey: 'menu-levels',
                    },
                ],
            },
        ],
    },
    {
        key: 'pages',
        icon: 'mdi mdi-cards-outline',
        label: 'Pages',
        isTitle: true,
        children: [
            {
                key: 'error-pages',
                label: 'Errors',
                isTitle: false,
                icon: 'ri-bug-line',
                parentKey: 'pages',
                children: [
                    {
                        key: 'page-error-404',
                        label: 'Error - 404',
                        url: '/error-404',
                        parentKey: 'error-pages',
                    },
                    {
                        key: 'page-error-500',
                        label: 'Error - 500',
                        url: '/error-500',
                        parentKey: 'error-pages',
                    },
                ],
            },
            {
                key: 'extra-pages',
                label: 'Utility',
                isTitle: false,
                icon: 'ri-pages-line',
                parentKey: 'pages',
                children: [
                    {
                        key: 'page-pricing',
                        label: 'Pricing',
                        url: '/pages/pricing',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-timeline',
                        label: 'Timeline',
                        url: '/pages/timeline',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-invoice',
                        label: 'Invoice',
                        url: '/pages/invoice',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-faq',
                        label: 'FAQs',
                        url: '/pages/faq',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-gallery',
                        label: 'Gallery',
                        url: '/pages/gallery',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-maintenance',
                        label: 'Maintenance',
                        url: '/maintenance',
                        parentKey: 'extra-pages',
                    },
                    {
                        key: 'page-coming-soon',
                        label: 'Coming Soon',
                        url: '/coming-soon',
                        parentKey: 'extra-pages',
                    },
                ],
            },
        ],
    },
];

export { MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
