import React, {useEffect, useMemo, useState} from "react";
import { animated, useTransition, config } from 'react-spring';
import cx from 'classnames';
import {useDimmer} from "../Dimmer";

export const Header = ({ className, ...rest }) => {
    return (
        <div className={cx([className], 'header')} {...rest} />
    )
};

export const Content = ({ image, ...rest }) => {
    return <div className={cx({image}, 'content')} {...rest} />
};

export const Actions = (props) => {
    return (
        <div className="actions" {...props} />
    );
};

Header.defaultProps = {
    className: ''
};

export default function Modal({ visible, onClose, children, size }) {
    const [ localVisible, setLocalVisible ] = useState(visible);

    // we only watch for opening modal
    useEffect(() => {
        if (!!visible && visible !== localVisible) {
            setLocalVisible(visible);
        }
    }, [localVisible, visible]);

    const transitions = useTransition(visible, null, {
        from: { transform: 'scale(0.5)', opacity: 0 },
        enter: { transform: 'scale(1)', opacity: 1 },
        leave: { transform: 'scale(0.5)', opacity: 0 },
        onDestroyed: () => {
            if (!visible && localVisible) {
                setLocalVisible(false);
            }
        },
        config: visible ? config.default : {
            ...config.stiff,
            duration: 250
        }
    });

    const dimmer = useDimmer();

    useEffect(() => {
        if (dimmer) {
            if (localVisible) {
                dimmer.show();
            } else {
                dimmer.hide();
                if (!onClose) return;
                onClose();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localVisible]);

    const classes = useMemo(() => {
        return cx('ui', [size], { visible: localVisible, active: localVisible }, 'transition modal');
    }, [localVisible, size]);

    return transitions.map(({ item, key, props }) => {
        if (!item) return null;

        return (
            <animated.div className={classes} key={key} style={props}>
                {children}
            </animated.div>
        );
    });
}

Modal.defaultProps = {
    size: ''
};