import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { Flex } from '../Layout/Flex';
import { Typography } from '../Typography/Typography';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface CollapsibleProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    title: string;
    defaultOpen?: boolean;
    icon?: JSX.Element;
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function Collapsible({ title, defaultOpen = false, icon, className = '', children, sx, ...props }: CollapsibleProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`collapsible ${className}`} style={sxToStyle(sx)} {...props}>
            <button className="collapsible__header" onClick={toggle} type="button">
                <Flex align="center" gap="xs" sx={{ flex: 1 }}>
                    <span className="collapsible__toggle">{isOpen ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}</span>
                    {icon && <span className="collapsible__icon">{icon}</span>}
                    <Typography variant="body-medium" className="collapsible__title">
                        {title}
                    </Typography>
                </Flex>
            </button>
            <div className={`collapsible__content ${isOpen ? 'collapsible__content--open' : ''}`}>{children}</div>
        </div>
    );
}
