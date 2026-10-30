'use client';
import styles from "./CustomContainer.module.css";

interface CustomContainerProps{
    children: React.ReactNode;
    title?: string;
}

export const CustomContainer = (props: CustomContainerProps) => {
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