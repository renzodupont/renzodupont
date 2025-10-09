# Guía de Títulos Fuertes 💪

Esta guía explica cómo crear títulos que sean **informativos, atractivos y efectivos** para combatir la desinformación.

---

## 🎯 Filosofía: Informativo pero Atractivo

Queremos títulos que:

- ✅ **NO** sean clickbait mentiroso
- ✅ **SÍ** sean casi clickbait (muy atractivos)
- ✅ Informen claramente el tema
- ✅ Generen curiosidad o urgencia
- ✅ Usen poder de las palabras

---

## 📝 Reglas para Títulos Fuertes

### 1. Usa Palabras de Poder

**Verbos de acción:**

- Revelado, Descubierto, Expuesto, Desenmascarado
- Oculto, Escondido, Silenciado
- Amenaza, Crisis, Colapso, Impacto

**Sustantivos fuertes:**

- Verdad, Realidad, Evidencia, Datos
- Plan, Estrategia, Táctica, Maniobra
- Peligro, Riesgo, Amenaza

**Ejemplos:**

- ❌ "Privatización de la educación"
- ✅ "Educación Pública en **Peligro**: El **Plan Oculto** de Privatización"

---

### 2. Sé Específico (Cifras, Años, Lugares)

**Incluir números concretos:**

- "2 Millones de Trabajadores"
- "Crisis 2025"
- "50% de Aumento"
- "Últimos 5 Años"

**Mencionar lugares:**

- "en Uruguay"
- "del Río de la Plata"
- "en Montevideo"

**Ejemplos:**

- ❌ "Flexibilización laboral afecta a trabajadores"
- ✅ "Flexibilización Laboral: Cómo **2 Millones de Trabajadores** Pierden sus Derechos"

- ❌ "Inflación en Argentina"
- ✅ "Inflación Argentina **2025**: Los Datos que el Gobierno Oculta"

---

### 3. Genera Curiosidad o Urgencia

**Fórmulas que funcionan:**

- "Cómo [algo negativo sucede]"
- "Por qué [algo importante está pasando]"
- "Lo que [autoridad] no te cuenta sobre..."
- "La verdad detrás de..."
- "El precio oculto de..."

**Ejemplos:**

- ❌ "Desinformación sobre el dólar"
- ✅ "Fake News del Dólar: **Cómo** los Medios Crean Crisis Artificiales"

- ❌ "Contaminación del agua"
- ✅ "Agua Contaminada: **El Precio Oculto** del Agronegocio en Uruguay"

---

### 4. Estructura Efectiva

**Fórmula base:**

```
[Tema Principal]: [Subtema Específico con Impacto]
```

**Ejemplos:**

- "Criminalización de la Protesta: La Nueva Táctica para Silenciar al Pueblo"
- "Big Pharma: Cuando las Ganancias Importan Más que las Vidas"
- "Fake News Económicas: Cómo los Medios Manipulan la Inflación"

**Variaciones:**

```
[Pregunta Provocativa]: [Respuesta o Implicación]
```

- "¿Libertad de Mercado? El Verdadero Costo de la Desregulación Laboral"

---

## ✅ Buenos Ejemplos (Transformaciones Reales)

### Ejemplo 1: Educación

❌ **ANTES:** "La privatización de la educación pública"
✅ **DESPUÉS:** "Educación Pública en Peligro: El Plan Oculto de Privatización en Uruguay"

**Por qué funciona:**

- "Peligro" genera urgencia
- "Plan Oculto" genera curiosidad
- "Uruguay" especifica lugar
- Dos puntos crean estructura clara

---

### Ejemplo 2: Trabajo

❌ **ANTES:** "Flexibilización laboral en Uruguay y Argentina"
✅ **DESPUÉS:** "Flexibilización Laboral: Cómo 2 Millones de Trabajadores Pierden sus Derechos"

**Por qué funciona:**

- "2 Millones" cuantifica impacto
- "Cómo" promete explicación
- "Pierden" verbo de acción negativa
- "Derechos" concepto importante

---

### Ejemplo 3: Economía

❌ **ANTES:** "Desinformación sobre el dólar en Argentina"
✅ **DESPUÉS:** "Fake News del Dólar: Cómo los Medios Crean Crisis Artificiales en Argentina"

**Por qué funciona:**

- "Fake News" término reconocible
- "Cómo" promete revelación
- "Crean Crisis Artificiales" expone manipulación
- "Argentina" ubica geográficamente

---

### Ejemplo 4: Medioambiente

❌ **ANTES:** "Contaminación del agua por agronegocio"
✅ **DESPUÉS:** "Agua Contaminada: El Precio Oculto del Agronegocio en Uruguay"

**Por qué funciona:**

- "Precio Oculto" revela costo no visible
- "Uruguay" especifica lugar
- Tema concreto y tangible

---

### Ejemplo 5: Política

❌ **ANTES:** "Criminalización de la protesta social"
✅ **DESPUÉS:** "Criminalización de la Protesta: La Nueva Táctica para Silenciar al Pueblo"

**Por qué funciona:**

- "Nueva Táctica" indica estrategia deliberada
- "Silenciar al Pueblo" enfatiza impacto democrático
- Estructura [Tema]: [Consecuencia]

---

## 🚫 Qué Evitar

### ❌ Títulos Genéricos

- "Problemas en la educación"
- "La situación económica"
- "Aspectos de la política laboral"

### ❌ Títulos Académicos/Aburridos

- "Análisis de la flexibilización laboral en el marco jurídico uruguayo"
- "Consideraciones sobre la privatización educativa"
- "Estudio de la desinformación mediática"

### ❌ Clickbait Mentiroso

- "No vas a creer lo que encontramos" (demasiado vago)
- "Los médicos ODIAN este truco" (falso/exagerado)
- "URGENTE: Todo cambia HOY" (si no es verdad)

### ❌ Demasiado Largo

- "La privatización de la educación pública en Uruguay y Argentina: Un análisis crítico de las políticas neoliberales implementadas en los últimos años"

**Límite ideal:** 60-100 caracteres

---

## 🤖 Regenerar Títulos Automáticamente

### Comando Principal

```bash
npm run regenerate-titles
```

Regenera **todos** los títulos de forma automática usando IA.

### Vista Previa (Sin Cambios)

```bash
npm run regenerate-titles-dry
```

### Un Solo Post

```bash
node regenerate-titles.js "public/posts/2025/10/mi-post.html"
```

### Características

- ✅ Crea backups automáticos (.backup.html)
- ✅ Respeta el contenido original
- ✅ Genera títulos según estas reglas
- ✅ Espera 3 segundos entre posts (rate limiting)
- ✅ Muestra resumen al final

---

## 📊 Checklist de Título Fuerte

Antes de publicar, verifica:

- [ ] ¿Tiene entre 60-100 caracteres?
- [ ] ¿Usa al menos una palabra de poder?
- [ ] ¿Incluye cifras o años cuando sea relevante?
- [ ] ¿Menciona Uruguay o Argentina?
- [ ] ¿Genera curiosidad o urgencia?
- [ ] ¿Es honesto (no clickbait mentiroso)?
- [ ] ¿Informa claramente el tema?
- [ ] ¿Suena atractivo al leerlo en voz alta?

---

## 💡 Tips Extra

### Técnica del "Dos Puntos"

Separa tema principal de subtema específico:

```
[Tema Principal]: [Impacto/Revelación/Consecuencia]
```

### Usa Contraste

Contraponer dos ideas genera interés:

```
"Libertad de Mercado vs. Derechos Laborales: El Verdadero Costo"
"Ganancias Corporativas vs. Vidas Humanas: La Realidad de Big Pharma"
```

### Aprovecha el Reconocimiento

Términos que la gente conoce:

- Fake News
- Big Pharma
- Agronegocio
- Lawfare
- Troll Farms

### Pregunta Retórica

```
"¿Desarrollo Sostenible? La Verdad sobre el Agronegocio en Uruguay"
"¿Libertad de Prensa? Concentración Mediática en el Río de la Plata"
```

---

## 📈 Medir Efectividad

**Indicadores de un buen título:**

- ✅ Tasa de clics alta en redes sociales
- ✅ Mayor tiempo de permanencia en el artículo
- ✅ Más compartidos orgánicos
- ✅ Comentarios relevantes y de calidad

**Hacer A/B testing:**

- Probar diferentes versiones del mismo título
- Ver cuál genera más engagement
- Ajustar fórmula según resultados

---

## 🎓 Conclusión

Un título fuerte es:

1. **Informativo** - dice de qué trata
2. **Específico** - usa cifras, lugares, años
3. **Atractivo** - palabras de poder, curiosidad
4. **Honesto** - no exagera ni miente
5. **Urgente** - genera deseo de leer YA

**Recuerda:** El título es la puerta de entrada. Si no atrae, el mejor contenido no será leído.

---

**💪 ¡Ahora crea títulos que capturen atención y difundan la verdad!**
