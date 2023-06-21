import React,  { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MovieState } from '../../redux/types';

export const ToastNotifications:FC = () => {
    const error = useSelector((state: MovieState) => state.error);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return null; // this component doesn't render anything itself
}