import React from "react";
import NavigationPages from "./NavigationPages";
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';


const App = () => {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <NavigationPages/>
        </ApplicationProvider>
    );
};

export default App;
