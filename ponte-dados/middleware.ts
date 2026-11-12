// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const ipVisitante = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
//                    || request.headers.get('x-real-ip') 
//                    || '';
                   
//   const ipsPermitidos = (process.env.IPS_REDE_EMPRESA || '').split(',').map(ip => ip.trim());

//   if (process.env.NODE_ENV === 'production' && !ipsPermitidos.includes(ipVisitante)) {
//     return new NextResponse(
//       `Acesso restrito a Ponte de Dados.`,
//       { status: 403 }
//     );
//   }

//   return NextResponse.next();
// }