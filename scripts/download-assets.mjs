import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(publicDir, { recursive: true });

const assets = [
  { url: 'https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/777cf791-4002-44da-9f6c-ecaf14551b39/10%2Bday%2Blogo.webp?format=1500w', name: 'logo.webp' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/f4433836-663b-40de-a992-a5745607f78c/kitchen+with+slab+backsplash.jpg?format=2500w', name: 'hero-bg.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/0d9dc93e-2eef-419b-a5d1-1e3d41e8a7c1/Kitchen+-+Ethos+in+Walnut+with+clear%2C+and+Denman+in+Powder+on+the+Island.jpg?content-type=image%2Fjpeg', name: 'kitchen-ethos-walnut.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/d8919457-4f54-449c-937d-b32b3d3a01ac/21.png?content-type=image%2Fpng', name: 'bath-remodel.png' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/66d7596b-2556-49cd-8f7f-7203a0ac9b63/Kitchen+-+Whistler+Flat+in+Frost.jpg?content-type=image%2Fjpeg', name: 'gallery-whistler-frost.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/da3ea0d3-59ea-4ee8-ae87-8251a29d29ee/Vanity+-+Metropolitan+Walnut+1.jpg?content-type=image%2Fjpeg', name: 'gallery-metropolitan-walnut.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/c805d147-3999-4249-bce3-cd1b9d4a042c/kitchen+with+quatz+backsplash.jpg?content-type=image%2Fjpeg', name: 'gallery-quartz-backsplash.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/935a950b-c2d5-4a2f-b112-5a025057f946/full+kitchen+with+marble+cpuntertop.jpg?content-type=image%2Fjpeg', name: 'gallery-marble-countertop.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/a3d20e09-5dd9-4dec-a6c7-d1da6a8e9ce4/full+kitchen+with+busher+block.jpg?content-type=image%2Fjpeg', name: 'gallery-butcher-block.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/030032ee-c9b7-4fb8-99f7-34129e493592/Luxury+Modern+Master+Bath+Concept.png?content-type=image%2Fpng', name: 'gallery-luxury-bath.png' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/da315904-f176-49cd-9c5f-d3fb752a5853/Essential+White+Bathroom+1.jpg?content-type=image%2Fjpeg', name: 'gallery-essential-white-bath.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/31f06899-aa52-4e30-bf5e-0fe5a22dd356/Bathroom1+View2.jpg?content-type=image%2Fjpeg', name: 'gallery-bath-view2.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/cd44f26c-d314-4820-a9d0-5a698ef24756/Oslo+White+Bathroom-+View+1.jpg?content-type=image%2Fjpeg', name: 'gallery-oslo-white-bath.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/1771030625302-7AFG37K0FJK2UDQONSGO/unsplash-image-o-uPDNNSsDA.jpg?format=1500w', name: 'cta-bg.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/27091dd3-e352-4cf1-b357-54d52fe46556/Photo+May+30+2024%2C+7+52+24+PM.jpg', name: 'project-forest-kitchen.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/1771537769352-ZB0LBHWMEFZAB4VNPVGU/2.png', name: 'project-university-place.png' },
  { url: 'https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/ee056b21-6388-4643-abb9-f4393ad0dae7/processed-ACF50660-E63C-4936-8770-E221552170B7.jpg', name: 'project-coastal-calm.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/a3efab77-0d76-4d32-8443-6632ed1161a7/1df74c77-21bd-4f67-a624-c083f38633db.png', name: 'project-heritage-woods.png' },
  { url: 'https://images.squarespace-cdn.com/content/v1/6982349a56e1e46c7b2e0861/9812e9cf-a1c7-4380-acee-309e6de86a3e/Photo+Jun+03+2024%2C+10+31+36+AM.jpg', name: 'project-midnight-blue.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/6c967fbe-1d52-4d18-962b-630ac4d8d319/1c9da333-8da0-44a7-a0b7-ww.jpg', name: 'ba-after-chehalis.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/16eb31c9-48fd-4d06-8aec-6e7190645f80/Photo+Sep+28+2023%2C+12+27+35.jpg', name: 'ba-before-chehalis.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/cf0cd942-98d3-4b1c-93e2-663b94a10859/IMG_1165.jpeg', name: 'ba-after-bath.jpg' },
  { url: 'https://images.squarespace-cdn.com/content/6982349a56e1e46c7b2e0861/c6840f27-e23f-4686-9aaa-f3a546dc54a7/img00486.jpg', name: 'ba-before-bath.jpg' },
];

function download(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest)) { console.log(`  skip ${path.basename(dest)}`); resolve(); return; }
    const file = fs.createWriteStream(dest);
    const proto = url.startsWith('https') ? https : http;
    const req = proto.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log(`  ✓ ${path.basename(dest)}`); resolve(); });
    });
    req.on('error', (e) => { fs.unlink(dest, () => {}); console.error(`  ✗ ${path.basename(dest)}: ${e.message}`); resolve(); });
    req.setTimeout(15000, () => { req.destroy(); console.error(`  timeout ${path.basename(dest)}`); resolve(); });
  });
}

// Download 4 at a time
async function run() {
  console.log(`Downloading ${assets.length} assets to public/images/...`);
  for (let i = 0; i < assets.length; i += 4) {
    const batch = assets.slice(i, i + 4);
    await Promise.all(batch.map(a => download(a.url, path.join(publicDir, a.name))));
  }
  console.log('Done.');
}
run();
