const fs = require('fs');
const https = require('https');

const fetchSvg = (url) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => resolve(data));
  }).on('error', reject);
});

(async () => {
  const swordSvg = await fetchSvg('https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f5e1.svg');
  const pizzaSvg = await fetchSvg('https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f355.svg');
  const ufoSvg = await fetchSvg('https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f6f8.svg');
  const wandSvg = await fetchSvg('https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1fa84.svg');

  const file = 'e:/portfolio/components/ui/CustomCursor.tsx';
  let content = fs.readFileSync(file, 'utf8');

  // React uses camelCase for SVG attributes, but Twemoji SVGs might have some raw attributes.
  // Actually Twemoji SVGs just use basic tags, but just to be safe, we don't strictly need to convert all unless React complains.
  // The most common is 'fill-rule' or 'clip-rule'. Twemoji SVGs rarely use them, but let's replace them if they do.
  
  const prepareSvg = (svg) => {
      let prepared = svg.replace('<svg ', '<svg className=\"w-full h-full\" ');
      // Fix common react warnings for svg
      prepared = prepared.replace(/fill-rule/g, 'fillRule');
      prepared = prepared.replace(/clip-rule/g, 'clipRule');
      prepared = prepared.replace(/stroke-width/g, 'strokeWidth');
      prepared = prepared.replace(/stroke-miterlimit/g, 'strokeMiterlimit');
      prepared = prepared.replace(/stroke-linecap/g, 'strokeLinecap');
      prepared = prepared.replace(/stroke-linejoin/g, 'strokeLinejoin');
      return prepared;
  };

  const replaceSection = \      case 12: // MINECRAFT_SWORD (SVG)
        return (
          <div className="w-12 h-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ transform: "rotate(-45deg)" }}>
            \${prepareSvg(swordSvg)}
          </div>
        );
      case 13: // PIZZA
        return (
          <motion.div 
            className="w-12 h-12 drop-shadow-lg"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            \${prepareSvg(pizzaSvg)}
          </motion.div>
        );
      case 14: // ALIEN_UFO
        return (
          <motion.div 
            className="w-12 h-12 drop-shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            \${prepareSvg(ufoSvg)}
          </motion.div>
        );
      case 15: // MAGIC_WAND
        return (
          <motion.div 
            className="w-12 h-12 drop-shadow-[0_0_15px_#a855f7]"
            animate={{ rotate: [0, 20, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            \${prepareSvg(wandSvg)}
          </motion.div>
        );\`;

  const startIdx = content.indexOf('case 12: // MINECRAFT_SWORD (SVG)');
  const endIdx = content.indexOf('default:', startIdx);
  
  if(startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + replaceSection + '\\n      ' + content.substring(endIdx);
    fs.writeFileSync(file, content);
    console.log('Successfully embedded Twemoji SVGs!');
  } else {
    console.log('Failed to find replacement range');
  }
})();
