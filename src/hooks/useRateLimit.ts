import { useCallback } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

export const useRateLimit = (userId: string | null, config: RateLimitConfig) => {
  const { maxAttempts, windowMs } = config;

  const checkRateLimit = useCallback(() => {
    if (!userId) return { allowed: true, remainingTime: 0 };

    const storageKey = `rate_limit_${userId}`;
    const now = Date.now();
    
    // Obtener intentos previos del localStorage
    const storedAttempts = localStorage.getItem(storageKey);
    let attempts: number[] = storedAttempts ? JSON.parse(storedAttempts) : [];
    
    // Filtrar intentos que están fuera de la ventana de tiempo
    attempts = attempts.filter(timestamp => now - timestamp < windowMs);
    
    // Verificar si el usuario ha alcanzado el límite
    if (attempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...attempts);
      const remainingTime = windowMs - (now - oldestAttempt);
      return { 
        allowed: false, 
        remainingTime: Math.ceil(remainingTime / 1000) // en segundos
      };
    }
    
    return { allowed: true, remainingTime: 0 };
  }, [userId, maxAttempts, windowMs]);

  const recordAttempt = useCallback(() => {
    if (!userId) return;

    const storageKey = `rate_limit_${userId}`;
    const now = Date.now();
    
    // Obtener intentos previos
    const storedAttempts = localStorage.getItem(storageKey);
    let attempts: number[] = storedAttempts ? JSON.parse(storedAttempts) : [];
    
    // Añadir el nuevo intento
    attempts.push(now);
    
    // Filtrar intentos antiguos y guardar
    attempts = attempts.filter(timestamp => now - timestamp < windowMs);
    localStorage.setItem(storageKey, JSON.stringify(attempts));
  }, [userId, windowMs]);

  return { checkRateLimit, recordAttempt };
}; 