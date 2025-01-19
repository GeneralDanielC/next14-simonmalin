"use client"

interface ContactWeddingProps {
    text: string
}

export const ContactWedding = ({
    text
}: ContactWeddingProps) => {
    const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;

    return (
        <a href={`mailto:${email}`} className="underline">{text}</a>
    )
}