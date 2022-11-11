import React from "react";

export interface Side {
    direction: 'left' | 'right';
    children?: React.ReactNode;
}