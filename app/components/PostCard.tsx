import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface PostCardProps {
    title: string;
    subtitle: string;
    author?: string;
    createdAt?: string;
    coverImg?: string;
    post_id : number;
}

export default function PostCard({
    title,
    subtitle,
    author,
    createdAt,
    coverImg,
    post_id
}: PostCardProps) {
    return (
        <div className="bg-card rounded-lg shadow-md overflow-hidden flex flex-col w-full max-w-md md:max-w-2xl mx-auto border border-border min-h-[350px] cursor-pointer">
            <div className="relative w-full h-56">
                <Image
                    src={coverImg && coverImg !== "" ? coverImg : "/front.jpg"}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 700px"
                    priority
                />
            </div>
            <div className="flex-1 p-4 flex flex-col gap-2">
                <h2 className="text-xl font-bold text-foreground mb-1 line-clamp-2">{title}</h2>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-2">{subtitle}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-muted-foreground">By {author ? author : "Sharry Gill"}</span>
                    <span className="text-xs text-muted-foreground">{createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown date"}</span>
                </div>
                <Link href={`/blog/${post_id}`}>
                    <Button className="mt-3 w-fit cursor-pointer" variant="outline">Read More</Button>
                </Link>
            </div>
        </div>
    );
}
