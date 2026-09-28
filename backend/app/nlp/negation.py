import re
from typing import Any, Dict, List


# -------------------------------------------------
# Negation expressions
# -------------------------------------------------

NEGATION_PATTERNS = [
    r"\bno\b",
    r"\bnot\b",
    r"\bnever\b",
    r"\bwithout\b",
    r"\bdo not\b",
    r"\bdoes not\b",
    r"\bdid not\b",
    r"\bdon't\b",
    r"\bdoesn't\b",
    r"\bdidn't\b",
    r"\bhave no\b",
    r"\bhas no\b",
    r"\bhad no\b",
    r"\bno signs of\b",
    r"\bno symptoms of\b",
]


# Words that usually indicate that the negation
# applies only to the following phrase.
NEGATION_SCOPE_BREAKERS = [
    "but",
    "however",
    "although",
    "though",
    "except",
    "while",
    "yet"
]


def _get_previous_clause(text: str, entity_start: int) -> str:
    """
    Get the part of the sentence immediately before
    the entity, stopping at common clause boundaries.
    """

    previous_text = text[:entity_start]

    # Look for the most recent clause separator.
    separators = [
        ",",
        ";",
        ".",
        "!",
        "?",
    ]

    latest_position = -1

    for separator in separators:
        position = previous_text.rfind(separator)

        if position > latest_position:
            latest_position = position

    if latest_position != -1:
        previous_text = previous_text[latest_position + 1:]

    # Stop at conjunctions that commonly change scope.
    lower_text = previous_text.lower()

    latest_breaker_position = -1
    latest_breaker_length = 0

    for breaker in NEGATION_SCOPE_BREAKERS:

        match = re.search(
            rf"\b{re.escape(breaker)}\b",
            lower_text
        )

        if match and match.start() > latest_breaker_position:
            latest_breaker_position = match.start()
            latest_breaker_length = len(match.group())

    if latest_breaker_position != -1:
        previous_text = previous_text[
            latest_breaker_position + latest_breaker_length:
        ]

    return previous_text.strip()


def is_negated(
    text: str,
    entity_start: int,
    window: int = 30
) -> bool:
    """
    Determine whether an entity is likely negated.

    The detector examines only the local clause immediately
    before the entity rather than the entire previous sentence.
    """

    previous_clause = _get_previous_clause(
        text,
        entity_start
    )

    # Limit the amount of text considered.
    if len(previous_clause) > window:
        previous_clause = previous_clause[-window:]

    previous_clause = previous_clause.lower()

    # Check for explicit negation patterns.
    for pattern in NEGATION_PATTERNS:

        if re.search(pattern, previous_clause):
            return True

    return False


def detect_negations(
    text: str,
    entities: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Add a 'negated' field to every extracted entity.
    """

    results = []

    for entity in entities:

        updated_entity = entity.copy()

        entity_start = entity.get("start", 0)

        updated_entity["negated"] = is_negated(
            text,
            entity_start
        )

        results.append(updated_entity)

    return results