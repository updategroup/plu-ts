import { IRApp } from "../../IRNodes/IRApp";
import { IRDelayed } from "../../IRNodes/IRDelayed";
import { IRForced } from "../../IRNodes/IRForced";
import { IRFunc } from "../../IRNodes/IRFunc";
import { IRHoisted } from "../../IRNodes/IRHoisted";
import { IRLetted } from "../../IRNodes/IRLetted";
import { IRTerm } from "../../IRTerm";

export function findAll( term: IRTerm, predicate: ( elem: IRTerm ) => boolean ): IRTerm[]
{
    const stack: IRTerm[] = [term];
    const result: IRTerm[] = [];

    while( stack.length > 0 )
    {
        const t = stack.pop() as IRTerm;

        if( predicate( t ) ) result.push( t );
        
        if( t instanceof IRApp )
        {
            stack.push(
                t.fn,
                t.arg
            );
            continue;
        }

        if( t instanceof IRDelayed )
        {
            stack.push( t.delayed )
            continue;
        }

        if( t instanceof IRForced )
        {
            stack.push( t.forced );
            continue;
        }

        if( t instanceof IRFunc )
        {
            stack.push( t.body );
            continue;
        }
        
        if( t instanceof IRHoisted )
        {
            // 0 because hoisted are closed
            // for hoisted we keep track of the depth inside the term
            stack.push( t.hoisted );
            continue;
        }

        if( t instanceof IRLetted )
        {
            // same stuff as the hoisted terms
            // the only difference is that depth is then incremented
            // once the letted term reaches its final position
            stack.push( t.value );
            continue;
        }
    }

    return result;
}
