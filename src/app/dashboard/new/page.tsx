"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { linksApi } from "@/lib/api";
import { isLoadingStore, tokenStore, userStore } from "@/lib/auth-store";
import { useStoreValue } from "@simplestack/store/react";
import { ArrowLeft, Link2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NewLinkPage() {
  const router = useRouter();
  const user = useStoreValue(userStore);
  const token = useStoreValue(tokenStore);
  const authLoading = useStoreValue(isLoadingStore);

  const [originalUrl, setOriginalUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, authLoading, router]);

  const generateRandomCode = () => {
    const code = Math.random().toString(36).substring(2, 9);
    setCustomCode(code);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!token) return;

    // Basic URL validation
    try {
      new URL(originalUrl);
    } catch (error) {
      toast.error("Invalid URL", {
        description:
          "Please enter a valid URL starting with http:// or https://",
      });
      return;
    }

    setLoading(true);

    try {
      const newLink = await linksApi.createLink(
        token,
        originalUrl,
        customCode || undefined,
      );

      toast.success("Link created!", {
        description: `Your short link is ready: short.link/${newLink.shortCode}`,
      });

      router.push("/dashbaord");
    } catch (error) {
      toast("Error", {
        description: "Failed to create link. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 size={20} />
                <span>Create new link</span>
              </CardTitle>
              <CardDescription>
                Shorten your long URL and customize your short link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="originalUrl">Destination URL</Label>
                  <Input
                    id="originalUrl"
                    type="url"
                    placeholder="https://example.com/your-long-url"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                  />
                  <p className="text-muted-foreground text-sm">
                    Enter the URL you want to shorten
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customCode">
                    Custom short code
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <div className="flex gap-2">
                    <div className="border-input bg-muted flex flex-1 items-center gap-2 rounded-md border px-3">
                      <span className="text-muted-foreground text-sm">
                        short.link/
                      </span>
                      <Input
                        id="customCode"
                        type="text"
                        placeholder="my-custom-code"
                        value={customCode}
                        onChange={(e) =>
                          setCustomCode(
                            e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9-_]/g, ""),
                          )
                        }
                        className="h-auto border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        pattern="[a-z0-9-_]+"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateRandomCode}
                    >
                      <Sparkles size={16} />
                      <span>Generate</span>
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Leave empty to auto-generate a random code
                  </p>
                </div>

                <div className="border-border border-t pt-4">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/dashboard")}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !originalUrl}
                      className="flex-1"
                    >
                      {loading ? "Creating..." : "Create link"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Preview Card */}
          {originalUrl && (
            <Card className="bg-accent/5 border-accent/20 mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-muted-foreground mb-1 text-sm">
                    Short link
                  </p>
                  <p className="text-accent font-mono">
                    https://short.link/
                    {customCode || "(auto-generated)"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1 text-sm">
                    Destination
                  </p>
                  <p className="truncate text-sm">{originalUrl}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
