import { Router } from "express";
import path from "path";

const router = Router();

router.get('/', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/index.html')) });

router.get('/inicio_sesion', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/inicio_sesion.html')) });

router.get('/crear_cuenta', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/crear_cuenta.html')) });

router.get('/dashboard', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/dashboard.html')) });

router.get('/mi_biomo', (_req, res) => { res.sendFile(path.join(__dirname, 'pages/biomo/mi_biomo.html')) });

export const HtmlController = router;