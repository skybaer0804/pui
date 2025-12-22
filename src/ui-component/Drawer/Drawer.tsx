import { JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import { IconX } from '@tabler/icons-react';
import { IconButton } from '../Button/IconButton';
import { Flex } from '../Layout/Flex';
import { Typography } from '../Typography/Typography';
import { SxProps, sxToStyle } from '../../shared/sx';

export interface DrawerProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'style'> {
    open: boolean;
    onClose: () => void;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    title?: string;
    width?: string;
    sx?: SxProps;
    children: preact.ComponentChildren;
}

export function Drawer({ open, onClose, anchor = 'right', title, width = '400px', className = '', children, sx, ...props }: DrawerProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open) return null;

    const drawerStyle = {
        width: anchor === 'left' || anchor === 'right' ? width : 'auto',
        ...sxToStyle(sx),
    };

    return (
        <>
            <div className="drawer__backdrop" onClick={onClose} />
            <div className={`drawer drawer--${anchor} ${className}`} style={drawerStyle} {...props}>
                {title && (
                    <div className="drawer__header">
                        <Flex align="center" justify="space-between" sx={{ flex: 1 }}>
                            <Typography variant="h3" className="drawer__title">
                                {title}
                            </Typography>
                            <IconButton size="small" color="default" onClick={onClose} title="닫기">
                                <IconX size={20} />
                            </IconButton>
                        </Flex>
                    </div>
                )}
                <div className="drawer__content">{children}</div>
            </div>
        </>
    );
}
