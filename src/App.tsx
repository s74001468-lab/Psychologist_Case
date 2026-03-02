import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, BrainCircuit, 
  Clock, ChevronDown, ChevronUp, Send, MessageCircle, 
  AlertTriangle, Target, Activity, Lock
} from 'lucide-react';

// --- DATA ---

const benefits = [
  { icon: Target, title: 'Четкий план действий', desc: 'Пошаговый алгоритм выхода из кризиса уже на первой встрече.' },
  { icon: Activity, title: 'Видимый результат', desc: 'Улучшение состояния и снижение тревоги за 4 сессии.' },
  { icon: BrainCircuit, title: 'Работа с причиной', desc: 'Убираем корень проблемы, а не маскируем симптомы.' },
];

const quizQuestions = [
  {
    question: 'Как часто вы прокручиваете негативные сценарии перед сном?',
    options: ['Каждый день, не могу уснуть', 'Периодически, когда есть стресс', 'Редко, сплю нормально'],
  },
  {
    question: 'Что вы чувствуете, когда вам нужно сказать «Нет»?',
    options: ['Сильную вину и страх обидеть', 'Дискомфорт, но говорю', 'Спокойно отказываю'],
  },
  {
    question: 'Как вы оцениваете свой уровень фоновой тревоги (от 1 до 10)?',
    options: ['8-10 (Постоянное напряжение)', '5-7 (Часто тревожусь)', '1-4 (В целом спокоен)'],
  },
  {
    question: 'Какая сфера жизни сейчас страдает больше всего?',
    options: ['Отношения с партнером/семьей', 'Самореализация и деньги', 'Здоровье и внутреннее состояние'],
  },
];

const steps = [
  { num: '01', title: 'Бесплатная диагностика', desc: '20 минут. Выявляем корень проблемы и определяем, смогу ли я вам помочь.' },
  { num: '02', title: 'План терапии', desc: 'Подбираем метод (КПТ или Гештальт) под вашу конкретную задачу без лишней воды.' },
  { num: '03', title: 'Регулярные сессии', desc: 'Глубокая работа, домашние задания и поддержка между встречами.' },
  { num: '04', title: 'Результат', desc: 'Вы возвращаете себе спокойствие, уверенность и контроль над своей жизнью.' },
];

const cases = [
  { name: 'Анна, 34 года', problem: 'Пришла с ежедневными паническими атаками и страхом выходить из дома.', result: 'Через 5 сессий КПТ паника ушла. Анна сменила работу на более высокооплачиваемую и начала путешествовать.' },
  { name: 'Михаил и Елена', problem: 'Были на грани развода, постоянные скандалы из-за мелочей.', result: 'За 2 месяца терапии заново научились слышать друг друга. Сохранили семью и вернули близость.' },
];

const faqs = [
  { q: 'Это конфиденциально?', a: 'Абсолютно. Я строго соблюдаю этический кодекс психолога. Всё, что обсуждается на сессии, остается только между нами.' },
  { q: 'А онлайн-формат эффективен?', a: 'Да. Множество клинических исследований доказывают, что онлайн-терапия так же эффективна, как и очные встречи. Плюс вы находитесь в безопасной домашней обстановке.' },
  { q: 'Как проходит оплата?', a: 'Оплата производится переводом по реквизитам (выдаю чек как самозанятая) за 24 часа до начала платной сессии. Диагностика — бесплатно.' },
  { q: 'Сколько сессий мне понадобится?', a: 'Всё индивидуально. Облегчение наступает уже после 1-2 сессий. Для устойчивого результата в среднем требуется от 4 до 10 встреч.' },
];

// --- COMPONENTS ---

export default function App() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitted'>('idle');

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers([...quizAnswers, answer]);
    setQuizStep(prev => prev + 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally send data to a server/Telegram bot
    setFormStatus('submitted');
    // Track event
    console.log(JSON.stringify({
      event: "form_submit",
      timestamp: new Date().toISOString(),
      form_id: "diagnostic_form_main",
      lead_source: "yandex_direct"
    }));
  };

  const scrollToForm = () => {
    document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-slate-900 bg-[#FAFAFA] min-h-screen selection:bg-emerald-200">
      
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight">Татьяна Ильина</div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#method" className="hover:text-slate-900 transition">Методология</a>
            <a href="#cases" className="hover:text-slate-900 transition">Кейсы</a>
            <a href="#pricing" className="hover:text-slate-900 transition">Цены</a>
          </nav>
          <button 
            onClick={scrollToForm}
            className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition"
            data-event="header_cta_click"
          >
            Бесплатная диагностика
          </button>
        </div>
      </header>

      {/* 1. HERO BLOCK (Aggressive) */}
      <section className="pt-32 pb-20 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:w-1/2 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <AlertTriangle size={14} />
            Хватит терпеть тревогу
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Избавьтесь от тревоги и верните контроль над жизнью за 4 недели
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Структурная терапия без воды. Пошаговый план выхода из кризиса на первой <span className="font-semibold text-slate-900">бесплатной диагностике</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={scrollToForm}
              className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
              data-event="hero_cta_main"
            >
              Записаться на диагностику <ArrowRight size={18} />
            </button>
            <a 
              href="#quiz"
              className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:border-slate-300 hover:bg-slate-50 transition flex items-center justify-center"
              data-event="hero_cta_quiz"
            >
              Пройти тест
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:w-1/2 w-full"
        >
          <div className="aspect-[4/5] md:aspect-square bg-slate-200 rounded-3xl overflow-hidden relative shadow-2xl">
            {/* Main Photo: tatiana.jpg */}
            <img 
              src="/tatiana.jpg" 
              alt="Психолог Татьяна Ильина" 
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "https://avatars.mds.yandex.net/get-neurolanding-generate/15283349/85liGvnbp8zM8bc-pPQ4rQ/orig";
              }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-900">10+ лет опыта</div>
                  <div className="text-sm text-slate-600">Бережный кризис-менеджер</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. MICRO-VALUE */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100 shadow-sm">
                <b.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold">{b.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AGITATION (Узнаете себя?) */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Вы устали просыпаться с чувством тяжести?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-emerald-600 mb-4"><AlertTriangle size={32} strokeWidth={1.5} /></div>
            <p className="font-medium text-slate-900">Отношения зашли в тупик и приносят только боль и разочарование.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-emerald-600 mb-4"><AlertTriangle size={32} strokeWidth={1.5} /></div>
            <p className="font-medium text-slate-900">Деньги утекают сквозь пальцы из-за внутренних блоков и страха заявить о себе.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="text-emerald-600 mb-4"><AlertTriangle size={32} strokeWidth={1.5} /></div>
            <p className="font-medium text-slate-900">Постоянная фоновая тревога не дает расслабиться даже в выходные.</p>
          </div>
        </div>
        <p className="mt-12 text-lg text-slate-600 font-medium">
          Это не ваш характер. Это состояние, из которого <span className="text-slate-900 font-bold">есть выход</span>.
        </p>
      </section>

      {/* 3. QUIZ BLOCK */}
      <section id="quiz" className="py-20 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Узнайте свой тип тревожности за 1 минуту</h2>
            <p className="text-slate-400">Ответьте на 4 вопроса и получите персональную рекомендацию.</p>
          </div>

          <div className="bg-slate-800 rounded-3xl p-6 md:p-10 shadow-2xl border border-slate-700">
            {quizStep < quizQuestions.length ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={quizStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between text-sm text-slate-400 font-medium mb-2">
                    <span>Вопрос {quizStep + 1} из {quizQuestions.length}</span>
                    <span>{Math.round(((quizStep) / quizQuestions.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full transition-all duration-500"
                      style={{ width: `${((quizStep) / quizQuestions.length) * 100}%` }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-semibold mt-8 mb-6">{quizQuestions[quizStep].question}</h3>
                  
                  <div className="space-y-3">
                    {quizQuestions[quizStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuizAnswer(opt)}
                        className="w-full text-left p-4 rounded-xl bg-slate-700/50 border border-slate-600 hover:bg-slate-600 hover:border-slate-500 transition font-medium"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold">Тест пройден!</h3>
                <p className="text-slate-300">
                  Ваши ответы показывают, что вам идеально подойдет структурный подход (КПТ). 
                  Давайте разберем вашу ситуацию детально на бесплатной диагностике.
                </p>
                <button 
                  onClick={scrollToForm}
                  className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition w-full shadow-lg shadow-emerald-500/20"
                >
                  Записаться на бесплатный разбор
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 5. SOLUTION / TRANSITION */}
      <section className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как мы решим вашу проблему</h2>
          <p className="text-lg text-slate-600">Прозрачный путь из точки А (боль) в точку Б (результат).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Desktop connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
          
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-10">
              <div className="text-4xl font-black text-slate-100 absolute top-4 right-4 -z-10">{step.num}</div>
              <h3 className="text-xl font-bold mb-3 mt-4">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EXPERT BLOCK */}
      <section className="bg-white py-24 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/5">
            <div className="aspect-[3/4] bg-slate-200 rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="/tatiana2.jpeg" 
                alt="Татьяна Ильина" 
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = "https://avatars.mds.yandex.net/get-neurolanding-generate/14839663/tHrqcc1GnO3d1KpsN6sM2g/orig";
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:w-3/5 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Татьяна Ильина</h2>
            <p className="text-xl text-slate-600 font-medium">Практикующий психолог-консультант. 52 года.</p>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Я объединяю строгие академические знания и глубокий жизненный опыт. Моя задача — не просто выслушать вас, а дать <span className="font-semibold text-slate-900">рабочие инструменты</span> для изменения жизни.
              </p>
              <p>
                Я работаю как бережный, но структурный кризис-менеджер вашей психики. Мы не будем годами копаться в детстве, если вам нужна помощь прямо сейчас.
              </p>
            </div>
            <ul className="space-y-3 pt-4">
              <li className="flex items-center gap-3 font-medium text-slate-800">
                <CheckCircle2 className="text-emerald-600" size={20} /> Более 10 лет частной практики
              </li>
              <li className="flex items-center gap-3 font-medium text-slate-800">
                <CheckCircle2 className="text-emerald-600" size={20} /> Регулярная супервизия и личная терапия
              </li>
              <li className="flex items-center gap-3 font-medium text-slate-800">
                <CheckCircle2 className="text-emerald-600" size={20} /> Член ассоциации когнитивно-поведенческой психотерапии
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. METHODOLOGY */}
      <section id="method" className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Методы, которые дают результат</h2>
          <p className="text-lg text-slate-600">Объясняю сложные термины простыми словами.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <BrainCircuit className="text-teal-600" /> КПТ
            </h3>
            <p className="text-slate-600 mb-4">Когнитивно-поведенческая терапия. Золотой стандарт работы с тревогой и паникой.</p>
            <div className="bg-slate-50 p-4 rounded-xl text-sm font-medium text-slate-800 border border-slate-100">
              <span className="text-teal-600 font-bold">Результат:</span> Вы научитесь отслеживать негативные мысли, останавливать панику и действовать рационально.
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Activity className="text-emerald-600" /> Гештальт-терапия
            </h3>
            <p className="text-slate-600 mb-4">Глубокая работа с чувствами, обидами и личными границами.</p>
            <div className="bg-slate-50 p-4 rounded-xl text-sm font-medium text-slate-800 border border-slate-100">
              <span className="text-emerald-600 font-bold">Результат:</span> Вы проживете застрявшие эмоции, научитесь говорить «нет» и вернете легкость в тело.
            </div>
          </div>
        </div>
      </section>

      {/* 8. SOCIAL PROOF */}
      <section id="cases" className="bg-slate-900 py-24 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Истории моих клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cases.map((c, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
                <div className="font-bold text-xl mb-4 text-emerald-400">{c.name}</div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">Точка А (С чем пришли):</div>
                    <p className="text-slate-300">{c.problem}</p>
                  </div>
                  <div className="w-full h-px bg-slate-700" />
                  <div>
                    <div className="text-xs text-emerald-500 uppercase tracking-wider font-semibold mb-1">Точка Б (Результат):</div>
                    <p className="text-white font-medium">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRICING */}
      <section id="pricing" className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость работы</h2>
          <p className="text-lg text-slate-600">Прозрачные цены без скрытых платежей.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tier 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Знакомство</h3>
            <div className="text-3xl font-black mb-6">0 ₽</div>
            <ul className="space-y-3 mb-8 flex-grow text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> 20 минут онлайн</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Разбор вашей ситуации</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Понимание, подходим ли мы друг другу</li>
            </ul>
            <button onClick={scrollToForm} className="w-full py-3 rounded-xl font-semibold border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition">
              Записаться
            </button>
          </div>

          {/* Tier 2 (Highlighted) */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Самый частый выбор
            </div>
            <h3 className="text-xl font-bold mb-2">Разовая сессия</h3>
            <div className="text-3xl font-black mb-6">1 800 ₽</div>
            <ul className="space-y-3 mb-8 flex-grow text-sm text-slate-300">
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> 60 минут глубокой работы</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Разбор конкретного запроса</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-400 shrink-0" /> Домашнее задание</li>
            </ul>
            <button onClick={scrollToForm} className="w-full py-3 rounded-xl font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20">
              Выбрать
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Пакет 4 сессии</h3>
            <div className="text-3xl font-black mb-2">6 800 ₽</div>
            <div className="text-sm text-emerald-600 font-semibold mb-6">Выгода 400 ₽</div>
            <ul className="space-y-3 mb-8 flex-grow text-sm text-slate-600">
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> 4 встречи по 60 минут</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Системная работа на результат</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0" /> Поддержка в мессенджере</li>
            </ul>
            <button onClick={scrollToForm} className="w-full py-3 rounded-xl font-semibold border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition">
              Выбрать
            </button>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 bg-white border-y border-slate-200">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Частые вопросы</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button 
                  className="w-full p-6 text-left flex justify-between items-center font-semibold text-lg hover:bg-slate-50 transition"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  {openFaq === i ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. LEAD MAGNET (Telegram) */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#0088cc]/10 to-indigo-50 rounded-[2.5rem] p-8 md:p-16 border border-[#0088cc]/20">
          <div className="w-16 h-16 bg-[#0088cc] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#0088cc]/30">
            <Send size={32} className="-ml-1" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Пока не готовы к сессии?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Подпишитесь на мой Telegram-канал и заберите бесплатный гайд <span className="font-semibold text-slate-900">«5 техник экстренной самопомощи при тревоге»</span>.
          </p>
          <a 
            href="https://t.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#0088cc] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0077b3] transition shadow-lg shadow-[#0088cc]/20 w-full sm:w-auto"
            data-event="telegram_click"
          >
            Скачать гайд в Telegram
          </a>
        </div>
      </section>

      {/* 12. BOOKING FORM */}
      <section id="booking-form" className="py-24 bg-slate-900 text-white">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Сделайте первый шаг</h2>
            <p className="text-slate-400">Оставьте заявку на бесплатную 20-минутную диагностику. Я свяжусь с вами в течение дня.</p>
          </div>

          {formStatus === 'idle' ? (
            <form onSubmit={handleFormSubmit} className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="name">Ваше имя</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  placeholder="Как к вам обращаться?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="contact">Телефон или Telegram</label>
                <input 
                  type="text" 
                  id="contact" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  placeholder="+7 (999) 000-00-00 или @username"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="problem">С чем хотите поработать?</label>
                <select 
                  id="problem"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition appearance-none"
                >
                  <option value="anxiety">Тревога, паника, страхи</option>
                  <option value="relationships">Проблемы в отношениях</option>
                  <option value="selfesteem">Самооценка и уверенность</option>
                  <option value="money">Финансовые блоки / выгорание</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 text-lg"
              >
                Оставить заявку
              </button>
              
              <div className="flex items-start gap-2 text-xs text-slate-500 mt-4">
                <Lock size={14} className="shrink-0 mt-0.5" />
                <p>
                  Нажимая на кнопку, вы даете согласие на обработку персональных данных в соответствии с <a href="#" className="underline hover:text-slate-700">Политикой конфиденциальности</a> (ФЗ-152).
                </p>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500 text-white p-10 rounded-3xl text-center space-y-4"
            >
              <CheckCircle2 size={48} className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Заявка успешно отправлена!</h3>
              <p className="text-emerald-100">
                Спасибо за доверие. Я свяжусь с вами в ближайшее время по указанным контактам, чтобы подобрать удобное время для диагностики.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-sm">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-white text-lg mb-2">Татьяна Ильина</div>
            <p>Психолог-консультант. ИНН: 000000000000</p>
            <p className="mt-2 text-xs text-slate-500 max-w-md">
              Внимание: психологическое консультирование не является медицинской услугой. При наличии психиатрических диагнозов требуется консультация врача-психиатра.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <a href="mailto:hello@example.com" className="hover:text-white transition flex items-center gap-2">
              <MessageCircle size={16} /> Написать на почту
            </a>
            <a href="#" className="hover:text-white transition underline">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition underline">Согласие на обработку ПДн</a>
            <p className="mt-4 text-xs">© {new Date().getFullYear()} Все права защищены.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
