import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

interface Props {
  table: string;
}

type Record = { id: number; [key: string]: any };

export default function TableManager({ table }: Props) {
  const [items, setItems] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from(table).select('*');
      if (error) {
        setError(error.message);
      } else {
        setItems(data as Record[]);
      }
      setLoading(false);
    };
    fetchItems();
  }, [table]);

  const handleDelete = async (id: number) => {
    await supabase.from(table).delete().eq('id', id);
    setItems(items.filter((x) => x.id !== id));
  };

  return (
    <div>
      <h2>{table}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <pre>{JSON.stringify(item)}</pre>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
