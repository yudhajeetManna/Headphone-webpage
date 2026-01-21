import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | soundDEX",
    description: "Get in touch with the soundDEX team for support, press inquiries, or general questions.",
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
