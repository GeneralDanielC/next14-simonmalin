import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
    message?: string,
};

export const FormError = ({
    message
}: FormErrorProps) => {
    if (!message) return null;

    return (
        <div className="p-3 rounded-md flex items-center gap-x-2 text-sm bg-destructive/15 text-destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <p>{message}</p>
        </div>
    )
}