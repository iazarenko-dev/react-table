import { CircularProgress } from "@mui/material";
import { FC, PropsWithChildren } from "react";

import styles from './loading-content.module.css'

interface LoadingContentProps extends PropsWithChildren {
    isLoading?: boolean,
    className?:string,
}

export const LoadingContent: FC<LoadingContentProps> = ({ children, isLoading, className }) => (
    <div className={styles.default}>
        {isLoading && <p className={styles.loadingWrapper}><CircularProgress/></p>}
        <div className={`${isLoading ? styles.invisible : ''} ${className}`}>
            {children}
        </div>
    </div>
)