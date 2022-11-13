import { IconContext } from 'react-icons';
import type { ReactChildrenProps } from '../globals';

export interface GameInfoProps extends ReactChildrenProps {
    id: string;
};

export interface NavItemProps extends ReactChildrenProps {
    navSize: String,
    title: String,
    icon: any,
    active: boolean
}