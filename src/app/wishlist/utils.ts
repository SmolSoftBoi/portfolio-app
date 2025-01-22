import { parse } from 'csv';
import { createReadStream } from 'fs';
import { join } from 'path';
import { finished } from 'stream/promises';

export type WishlistItem = {
  name: string;
  isCompleted: boolean;
  tags: string[];
  url: string;
};

async function readCSVFile(filePath: string): Promise<WishlistItem[]> {
  const wishlist: WishlistItem[] = [];
  const parser = createReadStream(filePath).pipe(
    parse({
      cast: true,
      castDate: true,
      columns: true,
      skipEmptyLines: true,
      skipRecordsWithEmptyValues: true,
      trim: true,
    })
  );

  parser.on('readable', () => {
    let item;
    let itemColumnsLength;
    while ((item = parser.read())) {
      if (!itemColumnsLength) itemColumnsLength = Object.keys(item).length;

      wishlist.push({
        name: item.Name,
        isCompleted: item['Is Completed'] === 'TRUE',
        tags: item['Tags'].split(' '),
        url: item.URL,
      });
    }
  });

  await finished(parser);

  return wishlist;
}

async function getCSVData(filePath: string) {
  return await readCSVFile(filePath);
}

export async function getWishlistItems() {
  return await getCSVData(join(process.cwd(), 'src', 'wishlist.csv'));
}
