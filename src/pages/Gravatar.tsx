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
        <title>Gravatar Lookup - Zwanski Tech</title>
        <meta
          name="description"
          content="Look up Gravatar avatars by email address."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 axeptio-section">
          <div className="axeptio-container max-w-md">
            <h1 className="axeptio-heading text-center mb-6">
              Gravatar Lookup
            </h1>
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
