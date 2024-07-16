// import { NextApiRequest, NextApiResponse } from 'next';
// import shp from 'shpjs';
// import fs from 'fs';
// import path from 'path';

// const shapefilesDir = path.join(process.cwd(), 'public', 'geodataEcuador');

// const getShapefilePaths = (level: string) => {
//   return {
//     shp: path.join(shapefilesDir, `gadm41_ECU_${level}.shp`),
//     dbf: path.join(shapefilesDir, `gadm41_ECU_${level}.dbf`),
//     prj: path.join(shapefilesDir, `gadm41_ECU_${level}.prj`)
//   };
// };

// const getGeoJsonData = async (level: string) => {
//   const { shp: shpPath, dbf: dbfPath, prj: prjPath } = getShapefilePaths(level);
//   if (!fs.existsSync(shpPath) || !fs.existsSync(dbfPath) || !fs.existsSync(prjPath)) {
//     throw new Error('Shapefile components not found');
//   }

//   const shpData = fs.readFileSync(shpPath);
//   const dbfData = fs.readFileSync(dbfPath);
//   const prjData = fs.readFileSync(prjPath, 'utf8');

//   const arrayBufferShp = shpData.buffer.slice(shpData.byteOffset, shpData.byteOffset + shpData.byteLength);
//   const arrayBufferDbf = dbfData.buffer.slice(dbfData.byteOffset, dbfData.byteOffset + dbfData.byteLength);

//   return await shp.combine([shp.parseShp(arrayBufferShp, prjData), shp.parseDbf(arrayBufferDbf)]);
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { level } = req.query;

//   if (!level) {
//     return res.status(400).json({ error: 'Level query parameter is required' });
//   }

//   try {
//     const geojson = await getGeoJsonData(level as string);
//     res.status(200).json(geojson);
//   } catch (error) {
//     console.error('Error converting shapefile to GeoJSON:', error);
//     res.status(500).json({ error: 'Error converting shapefile to GeoJSON' });
//   }
// }
