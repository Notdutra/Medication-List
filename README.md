# Medication Safety Checker

A simple, mobile-friendly web application built with Next.js that helps users check if medications are safe to take. The app categorizes medications into "Safe to Take" and "Cannot Take" categories based on a predefined list.

## Features

- 🔍 **Real-time Search**: Search medications by name, active ingredient, or brand name
- 📱 **Mobile-Friendly**: Responsive design that works beautifully on all devices
- 🎨 **Clear Visual Feedback**: Color-coded results (Green for Safe, Red for Avoid)
- ⚡ **Fast & Simple**: No backend required, runs entirely in the browser
- 🎯 **Easy to Extend**: Simple JSON structure for adding more medications

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Medication-List
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
medication-list/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   └── ui/                 # shadcn/ui components
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       └── badge.tsx
│   ├── data/
│   │   └── medications.json    # Medication database
│   ├── types/
│   │   └── medication.ts       # TypeScript interfaces
│   ├── utils/
│   │   └── searchMedication.ts # Search logic
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## How to Use

1. **Search for a Medication**: Type the medication name, active ingredient, or brand name in the search bar
2. **View Results**: The app will display whether the medication is safe or should be avoided
3. **Read Details**: Each result includes the active ingredient, common brands, and important notes

## Adding More Medications

To add more medications to the database, edit `src/data/medications.json`:

```json
{
  "safe": [
    {
      "name": "Medication Name",
      "activeIngredient": "active ingredient",
      "commonBrands": ["Brand1", "Brand2"],
      "notes": "Important information about this medication"
    }
  ],
  "avoid": [
    {
      "name": "Medication Name",
      "activeIngredient": "active ingredient",
      "commonBrands": ["Brand1", "Brand2"],
      "notes": "Why this medication should be avoided"
    }
  ]
}
```

## Current Medication List

### Safe to Take (19 medications)

- Acetaminophen/Paracetamol (Tylenol)
- Antihistamines (Benadryl, Claritin, Zyrtec, Allegra)
- Cough medicines (Robitussin, Mucinex)
- Decongestants (Sudafed)
- Antispasmodics (Buscopan, Bentyl)
- Pain relievers (Tramadol, Codeine)
- Corticosteroids (Prednisone, Hydrocortisone)

### Cannot Take (20 medications)

- All NSAIDs (Aspirin, Ibuprofen, Naproxen, etc.)
- Diclofenac (Voltaren)
- Meloxicam (Mobic)
- Celecoxib (Celebrex)
- Metamizole/Dipyrone
- Metoclopramide (Reglan)

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

This app can be easily deployed to:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Any static hosting service**

For Vercel deployment:

```bash
npm i -g vercel
vercel
```

## Important Notes

⚠️ **Medical Disclaimer**: This application is for informational purposes only and should not replace professional medical advice. Always consult with your healthcare provider before taking any medication.

## Customization

### Changing Colors

The color scheme is defined in `tailwind.config.ts` and uses Tailwind's built-in color palette:

- Safe: `emerald-500` (green)
- Avoid: `red-500` (red)

To customize, update the color classes in `src/app/page.tsx`.

### Modifying the UI

All UI components are built with shadcn/ui and can be customized by editing files in `src/components/ui/`.

## Future Enhancements

Potential features to add:

- Drug interaction checker
- User favorites/history
- Dark mode
- Multi-language support
- Export/print functionality
- More detailed medication information
- Categories beyond safe/avoid (e.g., "use with caution")

## License

See LICENSE file for details.

## Support

For issues or questions, please open an issue on GitHub.
