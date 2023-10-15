import { Tooltip } from 'react-tooltip'

export type TTarefa = {
  id: number;
  texto: string;
  feita: boolean;
};

type TarefaProps = {
    tarefa: TTarefa;
    onMarcar: (id: number) => void;
    onRemover: (id: number) => void;
}

type TClasseCondicional = {
    classePadrao: string;
    classeTrue: string;
    classeFalse?: string;
}

function getClasse (classeCondicional: TClasseCondicional, condicao: boolean) {
    return condicao 
        ? `${classeCondicional.classePadrao} ${classeCondicional.classeTrue}`
        : `${classeCondicional.classePadrao} ${classeCondicional.classeFalse || ''}`
}

export function Tarefa({tarefa, onMarcar, onRemover}: TarefaProps) {
    const classesCondicionais = {
        checkbox: {
            classePadrao: "pr-4 h-4 appearance-none after:absolute transform after:w-4 after:h-4 after:border-2 after:border-blue-600",
            classeTrue: 'before:absolute before:h-2 before:w-2 before:translate-x-1 before:translate-y-1 before:bg-blue-600',
        } as TClasseCondicional,
        texto: {
            classePadrao: 'overflow-hidden overflow-ellipsis',
            classeTrue: 'line-through text-gray-400 flex',
        } as TClasseCondicional,
    };

  return <div 
    className="w-full flex flex-row justify-start items-center gap-2 py-1">
        <Tooltip 
            id={`texto-tarefa-${tarefa.id}`}
            content={tarefa.texto} 
            delayShow={300}
            className='z-10'/>
    <input 
        type="checkbox" 
        checked={tarefa.feita} 
        onChange={e => onMarcar(tarefa.id)}
        className={getClasse(classesCondicionais.checkbox, tarefa.feita)} />
    <pre 
        data-tooltip-id={`texto-tarefa-${tarefa.id}`}
        className={getClasse(classesCondicionais.texto, tarefa.feita)}>
            <span>{tarefa.texto}</span>
    </pre>
    <button 
        type="button" 
        onClick={e => onRemover(tarefa.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 ml-auto">
            Remover
    </button>
  </div>;
}
