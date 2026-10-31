import { motion } from "motion/react";

/* ===== INÍCIO: entrada discreta dos conteúdos ===== */
// Opacidade + 8px na vertical: não altera espaçamento nem cria rolagem horizontal.
// Com prefers-reduced-motion, o MotionConfig do Portfolio remove o deslocamento.
const DESLOCAMENTO_PX = 8;
const DURACAO_S = 0.3;
const INTERVALO_ITENS_S = 0.05;

const variantesItem = {
  oculto: { opacity: 0, y: DESLOCAMENTO_PX },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: DURACAO_S, ease: "easeOut" },
  },
};

const variantesLista = {
  oculto: {},
  visivel: { transition: { staggerChildren: INTERVALO_ITENS_S } },
};

export function Revelar({ children, className, atraso = 0 }) {
  return (
    <motion.div
      className={className}
      initial={variantesItem.oculto}
      animate={variantesItem.visivel}
      transition={{ duration: DURACAO_S, ease: "easeOut", delay: atraso }}
    >
      {children}
    </motion.div>
  );
}

export function ListaAnimada({ children, className, ...props }) {
  return (
    <motion.ul
      className={className}
      variants={variantesLista}
      initial="oculto"
      animate="visivel"
      {...props}
    >
      {children}
    </motion.ul>
  );
}

export function ItemAnimado({ children, className }) {
  return (
    <motion.li className={className} variants={variantesItem}>
      {children}
    </motion.li>
  );
}
/* ===== FIM: entrada discreta dos conteúdos ===== */
