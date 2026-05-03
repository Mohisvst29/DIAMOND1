"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface ImageCardProps {
    file: {
        filename: string
        url: string
        contentType: string
        uploadDate: string
    }
}

export default function ImageCard({ file }: ImageCardProps) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(file.url)
        toast.success("URL copied to clipboard")
    }

    return (
        <Card className="overflow-hidden group">
            <div className="aspect-square relative bg-muted/20 flex items-center justify-center overflow-hidden">
                {file.contentType.startsWith('image/') ? (
                    <img
                        src={file.url}
                        alt={file.filename}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="text-4xl text-muted-foreground p-4 text-center break-all">
                        {file.filename}
                    </div>
                )}
            </div>
            <CardContent className="p-3">
                <p className="text-xs text-muted-foreground truncate" title={file.filename}>
                    {file.filename}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                    {new Date(file.uploadDate).toLocaleDateString()}
                </p>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 h-8 text-xs"
                    onClick={copyToClipboard}
                >
                    <Copy className="h-3 w-3 mr-2" />
                    Copy URL
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => window.open(file.url, '_blank')}
                >
                    <ExternalLink className="h-3 w-3" />
                </Button>
            </CardFooter>
        </Card>
    )
}
