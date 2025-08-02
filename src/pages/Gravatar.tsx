Here’s the fully merged component—conflict markers removed, SEO tags and dynamic lookup logic combined into one complete file:

```tsx
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Utility to compute MD5 hash using Web Crypto API
async function md5(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("MD5", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Gravatar() {
  const [email, setEmail] = useState("");
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const normalized = email.trim().toLowerCase();
    const result = await md5(normalized);
    setHash(result);
    setLoading(false);
  };

  const avatarUrl = hash
    ? `https://www.gravatar.com/avatar/${hash}?s=200&d=identicon`
    : null;

  return (
    <>
      <Helmet>
        <title>Gravatar Profile Lookup - ZWANSKI TECH</title>
        <meta
          name="description"
          content="Fetch and preview Gravatar images by entering an email address."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Gravatar Profile Lookup - ZWANSKI TECH"
        />
        <meta
          property="og:description"
          content="Fetch and preview Gravatar images by entering an email address."
        />
        <meta property="og:image" content="https://zwanski.org/og-image.png" />
        <meta property="og:url" content="https://zwanski.org/gravatar" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Gravatar Profile Lookup - ZWANSKI TECH"
        />
        <meta
          name="twitter:description"
          content="Fetch and preview Gravatar images by entering an email address."
        />
        <meta name="twitter:image" content="https://zwanski.org/og-image.png" />
      </Helmet>

      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />

        <main className="flex-grow py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4 max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Gravatar Lookup
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-center">
              Enter an email address to preview its Gravatar image.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md bg-background text-foreground"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                disabled={loading}
              >
                {loading ? "Loading..." : "Get Gravatar"}
              </button>
            </form>

            {avatarUrl && (
              <div className="mt-6 flex justify-center">
                <img
                  src={avatarUrl}
                  alt="Gravatar avatar"
                  className="rounded-full shadow-md w-48 h-48"
                />
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
```
