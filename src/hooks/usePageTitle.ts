import { useEffect, useState } from 'react';

// actions

// hooks
import { useRedux } from '.';

export default function usePageTitle(value: {
    title: string;
    breadCrumbItems: {
        label: string;
        path: string;
        active?: boolean;
    }[];
}) {
    const { dispatch } = useRedux();

    const [pageTitle] = useState(value);
}
