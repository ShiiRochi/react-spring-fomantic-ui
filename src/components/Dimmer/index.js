import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import cx from "classnames";
import {createPortal} from "react-dom";

export const DimmerContext = createContext({});

export function useDimmer() {
    return useContext(DimmerContext);
}

// how to make dimmer visible
// how to make dimmer hidden

const Dimmer = ({ children }) => {
    const [ residents, setResidents ] = useState(0);
    const [ visible, setDimmerVisibility ] = useState(false);

    useEffect(() => {
        if (visible) {
            document.querySelector('#body').classList.add('dimmed');
        }
        return () => document.querySelector('#body').classList.remove('dimmed');
    }, [visible]);

    const classes = useMemo(() => {
        return cx('ui', { visible, active: visible }, 'dimmer modals page');
    }, [visible])

    const ctx = useMemo(() => {
        return {
            visible,
            hide: () => {
                const nextResidents = residents > 0 ? residents - 1 : 0;
                setResidents(nextResidents);
                if (nextResidents === 0) {
                    setDimmerVisibility(false);
                }
            },
            show: () => {
                setResidents(residents + 1);
                setDimmerVisibility(true);
            }
        };
    }, [residents, visible]);

    if (!document) return null;

    return createPortal(
        <DimmerContext.Provider value={ctx}>
            <div className={classes}>
                {children}
            </div>
        </DimmerContext.Provider>
        ,
        document.body
    );
};

export default Dimmer;