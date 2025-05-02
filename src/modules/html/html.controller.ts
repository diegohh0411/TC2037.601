import { Router } from "express";
import path from "path";
import fs from "fs/promises";

import { recordRepository } from "../record/record.controller";

const router = Router();

router.get('/', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/index.html')) });

router.get('/inicio_sesion', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/inicio_sesion.html')) });

router.get('/crear_cuenta', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/crear_cuenta.html')) });

router.get('/dashboard', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/dashboard.html')) });

router.get('/mi_biomo', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/biomo/mi_biomo.html')) });

router.get('/records', async (_req, res) => {
  const html = await fs.readFile(
    path.join(__dirname, 'pages/records.html'),
    'utf-8'
  )

  const forLoopHtml = html.slice(
    html.search(/<%FOR%>/g),
    html.search(/<%END%>/g) + '<%END%>'.length
  ).replace(/<%.*%>/g, '');

  const records = await recordRepository.findAll({ take: 10, skip: 0 });

  let newHtml = ''

  for (const record of records) {
    let loopHtml = forLoopHtml.replace(/{{record_id}}/g, record.record_id.toString())
    loopHtml = loopHtml.replace(/{{tipo_registro}}/g, record.tipo_registro.toString())
    loopHtml = loopHtml.replace(/{{estado_tiempo}}/g, record.estado_tiempo.toString())

    newHtml += loopHtml
  }

  const htmlToSend = html.replace(
    html.slice(
      html.search(/<%FOR%>/g),
      html.search(/<%END%>/g) + '<%END%>'.length
    ),
    newHtml
  );

  res.send(htmlToSend)
});

export const HtmlController = router;