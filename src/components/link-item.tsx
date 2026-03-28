"use client";

import { Link } from "@/lib/api";
import { Copy, ExternalLink, MoreVertical, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface LinkItemProps {
  link: Link;
  onDelete: (id: string) => void;
}

export function LinkItem({ link, onDelete }: LinkItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const shortUrl = `https://short.link/${link.shortCode}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    toast.success("Copied to clipboard", {
      description: "Short link copied successfully",
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(link.id);
      toast.success("Link deleted", {
        description: "Your short link has been deleted",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete link",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedDate = new Date(link.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="border-border bg-card hover:border-accent/50 flex items-center gap-4 rounded-lg border p-4 transition-colors">
      <div className="shrink-0">
        {link.favicon ? (
          <div className="bg-secondary flex size-10 items-center justify-center overflow-hidden rounded-full">
            <Image
              src={link.favicon || "/placeholder.svg"}
              alt=""
              width={32}
              height={32}
              className="size-8"
            />
          </div>
        ) : (
          <div className="bg-secondary flex size-10 items-center justify-center rounded-full">
            <ExternalLink size={20} className="text-muted-foreground" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="truncate text-base font-medium hover:underline"
          >
            {shortUrl}
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="size-6 shrink-0"
            onClick={handleCopy}
          >
            <Copy size={12} />
          </Button>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <ExternalLink size={12} className="shrink-0" />
          <span className="truncate">{link.originalUrl}</span>
          <span className="shrink-0">•</span>
          <span className="shrink-0">{formattedDate}</span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="text-right">
          <div className="text-accent text-2xl font-bold">{link.clicks}</div>
          <div className="text-muted-foreground text-xs">clicks</div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleCopy}>
              <Copy size={16} />
              <span>Copy link</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-destructive"
            >
              <Trash size={16} />
              <span>{isDeleting ? "Deleting..." : "Delete"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
