"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { LinkItem } from "@/components/link-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link, linksApi } from "@/lib/api";
import { isLoadingStore, tokenStore, userStore } from "@/lib/auth-store";
import { useStoreValue } from "@simplestack/store/react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const user = useStoreValue(userStore);
  const token = useStoreValue(tokenStore);
  const authLoading = useStoreValue(isLoadingStore);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (token) {
      loadLinks();
    }
  }, [token]);

  const loadLinks = async () => {
    if (!token) return;

    try {
      const data = await linksApi.getLinks(token);
      setLinks(data);
    } catch (error) {
      console.error("v[0] Failed to load links:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    if (!token) return;

    await linksApi.deleteLink(token, linkId);
    setLinks(links.filter((link) => link.id !== linkId));
  };

  const filteredLinks = links.filter(
    (link) =>
      link.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (authLoading || !user) {
    <div className="bg-background flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>;
  }

  return (
    <div className="bg-background min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header with Actions */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="mb-1 text-3xl font-bold">Links</h1>
              <p className="text-muted-foreground">
                Manage and track all your shortened links
              </p>
            </div>
            <Button size="lg" onClick={() => router.push("/dashboard/new")}>
              <Plus size={16} />
              <span>Create link</span>
            </Button>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
                size={16}
              />
              <Input
                placeholder="Search by short link or URL"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All links</DropdownMenuItem>
                  <DropdownMenuItem>Most clicks</DropdownMenuItem>
                  <DropdownMenuItem>Least clicks</DropdownMenuItem>
                  <DropdownMenuItem>Newest first</DropdownMenuItem>
                  <DropdownMenuItem>Oldest first</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Display</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Compact view</DropdownMenuItem>
                  <DropdownMenuItem>Detailed view</DropdownMenuItem>
                  <DropdownMenuItem>Grid view</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Links List */}
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Loading links...</p>
            </div>
          ) : filteredLinks.length === 0 ? (
            <div className="border-border rounded-lg border border-dashed py-12 text-center">
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "No links match your search" : "No links yet"}
              </p>
              {!searchQuery && (
                <Button onClick={() => router.push("/dashboard/new")}>
                  Create your first link
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLinks.map((link) => (
                <LinkItem
                  key={link.id}
                  link={link}
                  onDelete={handleDeleteLink}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
