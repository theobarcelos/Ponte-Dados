'use client';
import styles from "./CustomButton.module.css";

interface CustomButtonProps{
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    name?: string;
}

export const CustomButton = () => {

}