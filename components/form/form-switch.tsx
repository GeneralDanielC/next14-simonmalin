"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch"; // Using Switch from shadcn-ui
import { cn } from "@/lib/utils";
import { FormErrors } from "./form-errors";

interface FormSwitchProps {
    id: string;
    label?: string;
    description?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    value?: boolean;
    defaultChecked?: boolean;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: (checked: boolean) => void;
}

export const FormSwitch = ({
    id,
    label,
    description,
    required,
    disabled,
    errors,
    className,
    value,
    defaultChecked = false,
    onBlur,
    onFocus,
    onChange,
}: FormSwitchProps) => {
    const { pending } = useFormStatus();

    return (
        <div className="space-y-2 w-full">
            <div className="bg-stone-400/10 flex flex-row justify-between items-center rounded-xl shadow-sm px-3 py-2">
                {label ? (
                    <div className="flex flex-col justify-center">
                        <Label
                            htmlFor={id}
                            className="text-xs"
                        >
                            {label}
                        </Label>
                        <span className="text-xs text-stone-400">{description}</span>
                    </div>
                ) : null}
                <div className="flex items-center">
                    <Switch
                        id={id}
                        onBlur={onBlur}
                        onFocus={onFocus}
                        onCheckedChange={onChange}
                        defaultChecked={defaultChecked}
                        checked={value}
                        disabled={disabled || pending}
                        className={cn("", className)}
                        aria-describedby={`${id}-error`}
                    />
                </div>
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
};

FormSwitch.displayName = "FormSwitch";
