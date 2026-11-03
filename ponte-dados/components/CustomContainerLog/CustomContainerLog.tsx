'use client';
import styles from "./CustomContainerLog.module.css";

interface CustomContainerLogProps{
    children: React.ReactNode;
    title?: string;
}

export const CustomContainerLog = (props: CustomContainerLogProps) => {
    const {children, title} = props;

    return(
        <>
            <div className={ styles.container }>
                <h1>{ title }</h1>
                {children}
            </div>
        </>
    )
}