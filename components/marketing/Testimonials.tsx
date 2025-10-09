import React from 'react'

function Testimonials() {
  return (
    <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-black/5 ">
                    <h3  className="text-4xl font-bold text-blue-600">2,847</h3>
                    <p className="text-primary mt-2">Usuarios Esta Semana</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-black/5 ">
                    <h3 className="text-4xl font-bold  text-blue-600">89%</h3>
                    <p className="text-primary mt-2">Pasan ATS Primer Intento</p>
                </div>
                <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-background-dark/50 rounded-xl shadow-sm border border-black/5 ">
                    <div className="flex items-center gap-2">
                        <h3 className="text-4xl font-bold text-blue-600">4.9</h3>
                        <span className="material-symbols-outlined text-yellow-400 text-3xl">star</span>
                    </div>
                    <p className="text-slate-600 text-primary mt-2">Rating 2,341 reviews</p>
                </div>
            </div>
            <div className="relative max-w-3xl mx-auto bg-white dark:bg-background-dark/50 rounded-xl shadow-lg overflow-hidden border border-black/5 ">
                <div className="p-8 md:p-12">
                    <div className="text-center">
                        <p className="text-xl md:text-2xl font-medium text-blue-600">
                                "ResumeSmart me ayudó a pasar de 200 aplicaciones sin respuesta a 4 entrevistas en 10 días."
                        </p>
                <footer className="mt-6">
    <div className="inline-flex items-center">
    <img alt="Foto de perfil de Carlos M." className="h-12 w-12 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJZaWB7OfGLLBDez8FdbECzdozA8rGl6rv7d0pb36fwI5OblLOi9BK00rpfQ4auVZuGwHZD2F-fiiWZU78Plqw2iJSg9G12zSdc-W1SwG5TML7jP29m_WlhBgs0QA8PoEo3KX3A6xJYIZCmhBr02GTvSz724Hx5hG0TpXVmeXBWhUqKqeqXHXZ_jH5MRHzSvzukDv3hGM93I4QHjkZrsEyH-PbeKpl1WWUyJKstKiyRoAZ1uCxtrBfuRMB__phwOG1ZHQOJyH4Dns"/>
    <div className="ml-4 text-left">
    <p className="font-bold text-slate-900 ">Carlos M.</p>
    <p className="text-sm text-slate-500 ">Product Manager</p>
    </div>
    </div>
    </footer>
    </div>
    </div>
    <div className="absolute inset-y-0 left-0 flex items-center">
    <button className="p-2 m-2 rounded-full bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 text-primary transition-colors">

    </button>
    </div>
    <div className="absolute inset-y-0 right-0 flex items-center">
    <button className="p-2 m-2 rounded-full bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 text-primary transition-colors">
    <span className="material-symbols-outlined">arrow_forward</span>
    </button>
    </div>
    </div>
    </div>
    </section>
  )
}

export default Testimonials