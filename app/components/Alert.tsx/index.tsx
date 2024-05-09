interface Props {
    type?: string;
    message?: string;
    isShowing?: boolean;
}

export const Alert = ({ type, message, isShowing }: Props) => {
    return (
        <>
            {isShowing &&
                <div className={`absolute alert p-4 rounded-lg alert ${type === 'success' ? 'bg-green-300' : 'bg-red-300'}`}>
                    <p className={`${type === 'success' ? 'text-color-green-600' : 'text-red-600'}`}>{message}</p>
                </div>
            }
        </>
    )
}