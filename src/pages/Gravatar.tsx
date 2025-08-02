import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GravatarProfile {
  avatar?: string;
  displayName?: string;
  aboutMe?: string;
  currentLocation?: string;
  [key: string]: any;
}

const md5 = async (str: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

const Gravatar = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<GravatarProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProfile(null);
    try {
      const hash = await md5(email);
      const res = await fetch(`https://www.gravatar.com/${hash}.json`);
      if (!res.ok) {
        throw new Error("Profile not found");
      }
      const data = await res.json();
      const entry = data.entry?.[0] || {};
      setProfile({
        ...entry,
        avatar: `https://www.gravatar.com/avatar/${hash}?s=200`
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Gravatar Lookup - ZWANSKI TECH</title>
        <meta name="description" content="Lookup Gravatar profiles by email address." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-center mb-8">Gravatar Lookup</h1>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Fetch Avatar"}
            </Button>
          </form>
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {profile && (
            <div className="mt-8 text-center space-y-4">
              {profile.avatar && (
                <img
                  src={profile.avatar}
                  alt={profile.displayName || "Gravatar"}
                  className="w-32 h-32 rounded-full mx-auto"
                />
              )}
              {profile.displayName && <p className="font-semibold">{profile.displayName}</p>}
              {profile.currentLocation && <p className="text-sm text-muted-foreground">{profile.currentLocation}</p>}
              {profile.aboutMe && <p className="max-w-xl mx-auto">{profile.aboutMe}</p>}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Gravatar;

