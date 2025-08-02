# 👤 Gravatar Widget Integration

The Gravatar widget lets you show a user's profile image based on their email address. You can embed it directly with an `<iframe>` or render it as a reusable component.

## Embed with `<iframe>`

```html
<div class="gravatar-wrapper">
  <iframe
    src="https://www.gravatar.com/avatar/HASH?s=200&d=identicon"
    title="Gravatar profile"
    class="gravatar-frame"
    loading="lazy"
  ></iframe>
</div>
```

Replace `HASH` with the MD5 hash of the user's email (trimmed and lowercased). The iframe can be placed in any HTML page.

## React component example

```tsx
import md5 from "crypto-js/md5";

interface GravatarProps {
  email: string;
  size?: number;
}

export function Gravatar({ email, size = 200 }: GravatarProps) {
  const hash = md5(email.trim().toLowerCase()).toString();
  const src = `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;

  return (
    <img src={src} width={size} height={size} className="gravatar-img" alt="Gravatar" />
  );
}
```

Use the component anywhere in your app:

```tsx
<Gravatar email="user@example.com" size={128} />
```

## Responsive container resizing

```css
.gravatar-wrapper {
  width: 100%;
  max-width: 200px;
}

.gravatar-frame,
.gravatar-img {
  width: 100%;
  height: auto;
  border-radius: 50%;
}

@media (min-width: 768px) {
  .gravatar-wrapper {
    max-width: 300px;
  }
}
```

The container scales with the viewport, while the iframe or image fills the container and keeps a circular shape.
